import React, { useEffect, useState } from "react";
import {
	SafeAreaView,
	TextInput,
	Text,
	View,
	ScrollView,
	StyleSheet,
	Alert,
	TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import FilterCheckbox from "../components/FilterCheckbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import LocationSettingsScreen from "../screens/LocationSettings";

const GOOGLE_API_KEY = "AIzaSyDdd_L4HDBlllc885zSEEqZEr_IX9zVGeY"; // API key using Places API, Maps SDK for Android, and Geocoding API

export default function NearbyAutoShops() {
	const navigation = useNavigation();

	const [locationEnabled, setLocationEnabled] = useState(null);
	const [searchText, setSearchText] = useState(""); //tracks text entered in search input to look up address
	const [location, setLocation] = useState(null);
	const [region, setRegion] = useState(null); //region to be displayed on map
	const [places, setPlaces] = useState([]);

	const [showDealerships, setShowDealerships] = useState(true);
	const [showOilShops, setShowOilShops] = useState(true);
	const [showGasStations, setShowGasStations] = useState(true);
	const [showAutoShops, setShowAutoShops] = useState(true);

	useFocusEffect(
		React.useCallback(() => {
			let isActive = true; // so we can safely cancel if user leaves quickly

			const loadSetting = async () => {
				try {
					const storedValue = await AsyncStorage.getItem("locationEnabled");
					if (isActive) {
						if (storedValue !== null) {
							setLocationEnabled(JSON.parse(storedValue));
						} else {
							// defaults to being off if it can't find the stored location setting on/off value
							setLocationEnabled(false);
						}
					}
				} catch (err) {
					console.warn("Failed to load location setting:", err);
					if (isActive) {
						setLocationEnabled(true); // fallback
					}
				}
			};

			loadSetting();

			// handles if user leaves screen before async finishes
			return () => {
				isActive = false;
			};
		}, [])
	);

	useEffect(() => {
		if (locationEnabled === true) {
			(async () => {
				let { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== "granted") {
					Alert.alert("Permission denied", "Location access is required to show nearby shops.");
					return;
				}
				let userLocation = await Location.getCurrentPositionAsync({});
				setLocation(userLocation.coords);
				setRegion({
					latitude: userLocation.coords.latitude,
					longitude: userLocation.coords.longitude,
					latitudeDelta: 0.05,
					longitudeDelta: 0.05,
				});
			})();
		}
	}, [locationEnabled]);

	useEffect(() => {
		if (region) {
			fetchNearbyPlaces({
				//makes sure location doesn't reset to user when changing filters
				latitude: region.latitude,
				longitude: region.longitude,
			});
		}
	}, [showDealerships, showOilShops, showGasStations, showAutoShops]);

	const fetchNearbyPlaces = async (coords) => {
		//fetches nearby auto-related locations from Places API
		const keywords = [];
		if (showDealerships) keywords.push("dealership");
		if (showOilShops) keywords.push("oil change");
		if (showGasStations) keywords.push("gas station");
		if (showAutoShops) keywords.push("auto repair");

		if (keywords.length === 0) {
			setPlaces([]);
			return;
		}

		try {
			const keywordString = keywords.join(" OR ");
			const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
				coords.latitude
			},${coords.longitude}&radius=5000&keyword=${encodeURIComponent(
				keywordString
			)}&key=${GOOGLE_API_KEY}`;

			const response = await axios.get(url);
			setPlaces(response.data.results || []);
		} catch (error) {
			console.error("Google Places API error:", error.message);
			Alert.alert("Failed to load places", "Check your API key and network.");
		}
	};

	const geocodeAddress = async (address) => {
		//converts user-entered address into coordinates using Geocoding API
		try {
			const res = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
					address
				)}&key=${GOOGLE_API_KEY}`
			);
			console.log("GEOCODING RESPONSE", res.data);
			if (res.data.results.length > 0) {
				const loc = res.data.results[0].geometry.location;
				const newCoords = {
					latitude: loc.lat,
					longitude: loc.lng,
				};
				setRegion({
					...newCoords,
					latitudeDelta: 0.05,
					longitudeDelta: 0.05,
				});
				setLocation(newCoords);
				fetchNearbyPlaces(newCoords);
			} else {
				Alert.alert("Address not found", "Try a more specific address.");
			}
		} catch (err) {
			console.error("Geocoding failed:", err.message);
			Alert.alert("Failed to find location", "Check your address and internet.");
		}
	};

	if (!locationEnabled) {
		return (
			<SafeAreaView style={styles.container}>
				<TopBar headingTitle="Nearby Auto Shops & Gas Stations" />

				<View style={styles.disabledContent}>
					<MaterialCommunityIcons
						name="alert-circle-outline"
						size={64}
						color="#999"
						style={{ marginBottom: 16 }}
					/>
					<Text style={styles.disabledText}>
						You need to have location services enabled to view Auto Shops and Gas Stations nearby.{" "}
					</Text>
					<TouchableOpacity
						onPress={() => navigation.navigate("Settings", { screen: "LocationSettings" })}
					>
						<Text style={styles.navigateLocationSettingsText}>Enable Location Services</Text>
					</TouchableOpacity>
				</View>

				<BottomBar />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<TopBar headingTitle="Nearby Auto Shops & Gas Stations" />

			<TextInput
				style={styles.searchBox} //allows user to trigger geocode search on enter
				placeholder="Search or update your location"
				value={searchText}
				onChangeText={setSearchText}
				onSubmitEditing={() => geocodeAddress(searchText)}
			/>

			<View style={{ flex: 0.3 }}>
				<ScrollView contentContainerStyle={styles.filterContainer}>
					<FilterCheckbox
						label="Dealerships"
						value={showDealerships}
						onValueChange={setShowDealerships}
					/>
					<FilterCheckbox label="Oil Shops" value={showOilShops} onValueChange={setShowOilShops} />
					<FilterCheckbox
						label="Gas Stations"
						value={showGasStations}
						onValueChange={setShowGasStations}
					/>
					<FilterCheckbox
						label="Auto Shops"
						value={showAutoShops}
						onValueChange={setShowAutoShops}
					/>
				</ScrollView>
			</View>

			<View style={{ flex: 0.7, borderRadius: 8, overflow: "hidden" }}>
				{region && (
					<MapView style={{ flex: 1 }} region={region} showsUserLocation>
						{places.map((place, index) => (
							<Marker
								key={index}
								coordinate={{
									latitude: place.geometry.location.lat,
									longitude: place.geometry.location.lng,
								}}
								title={place.name}
								description={place.vicinity}
							/>
						))}
					</MapView>
				)}
			</View>

			<BottomBar />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 0,
	},
	searchBox: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	filterContainer: {
		paddingVertical: 10,
    paddingHorizontal: 8
	},
	disabledContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	disabledText: {
		fontSize: 16,
		textAlign: "center",
	},
	navigateLocationSettingsText: {
		fontSize: 20,
		paddingTop: 20,
		textAlign: "center",
		fontWeight: "bold",
		color: "blue",
		textDecorationLine: "underline",
	},
});
