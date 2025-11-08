import React, { useContext, useState, useCallback, useEffect } from "react";
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
	Text,
	Button,
	Image,
	TouchableOpacity,
	Pressable,
	Modal,
	TextInput,
	Keyboard,
} from "react-native";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import FilterCheckbox from "../components/FilterCheckbox";
import Card from "../components/Card";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { auth } from "../config/firebaseConfig";
import { FilterContext } from "../utils/FilterContext";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useSmartCarAuth } from "../utils/smartcarAuth";
import { fetchVehicleData } from "../utils/fetchVehicleData";
import { useVehicleContext } from "../utils/VehicleContext";
import { Alert } from "react-native";
import { getDoc, doc } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";

export default function MaintenanceScreen({ navigation }) {
	const { promptAsync } = useSmartCarAuth();
	const user = auth.currentUser;
	const { selectedVehicleId, vehicleList, setSelectedVehicleId, selectedVehicle } =
		useVehicleContext();
	const [showAlerts, setShowAlerts] = useState(false);
	const [showTireAlert, setShowTireAlert] = useState(false);
	const [showBrakeAlert, setShowBrakeAlert] = useState(false);
	const [showOilAlert, setShowOilAlert] = useState(false);
	const [showBatteryAlert, setShowBatteryAlert] = useState(false);
	const [showFilterAlert, setShowFilterAlert] = useState(false);
	const [showBeltAlert, setShowBeltAlert] = useState(false);
	const [showSparkAlert, setShowSparkAlert] = useState(false);
	const [showTransAlert, setShowTransAlert] = useState(false);

	const {
		showOil,
		showFilter,
		showTires,
		showTimingBelt,
		showSparkPlugs,
		showTransFluid,
		showCoolant,
		showBattery,
		showBrakePads,
	} = useContext(FilterContext);

	// testing values, will be pulled from DB later
	const [FLTirePressure, setFLTirePressure] = useState(18);
	const [FRTirePressure, setFRTirePressure] = useState(39);
	const [BLTirePressure, setBLTirePressure] = useState(38);
	const [BRTirePressure, setBRTirePressure] = useState(37);
	const [mileage, setMileage] = useState(10000);
	const [oilPercent, setOilPercent] = useState(80);
	const [oilLastChange, setOilLastChange] = useState(24000);
	const [oilLife, setOilLife] = useState(6000);
	const [breakLastChange, setBreakLastChange] = useState(30000);
	const [batteryLastChange, setBatteryLastChange] = useState(new Date(2024, 5, 24)); // 5/24/2024
	const [filterLastChange, setFilterLastChange] = useState(18000);
	const [beltLastChange, setBeltLastChange] = useState(18000);
	const [sparkLastChange, setSparkLastChange] = useState(18000);
	const [transLastChange, setTransLastChange] = useState(18000);

	// Recalculate alert conditions whenever dependent state variables change
	useEffect(() => {
		// Compute the battery expiration date based on the current batteryLastChange
		const batteryExpirationDate = new Date(batteryLastChange);
		batteryExpirationDate.setFullYear(batteryExpirationDate.getFullYear() + 5);

		// Compute alert conditions locally
		const tireAlert =
			FLTirePressure < 20 || FRTirePressure < 20 || BLTirePressure < 20 || BRTirePressure < 20;
		const oilAlert = oilPercent < 20 || mileage - oilLastChange >= oilLife;
		const brakeAlert = mileage - breakLastChange >= 50000;
		const batteryAlert = new Date() >= batteryExpirationDate;
		const filterAlert = mileage - filterLastChange >= 15000;
		const beltAlert = mileage - beltLastChange >= 85000;
		const sparkAlert = mileage - sparkLastChange >= 80000;
		const transAlert = mileage - transLastChange >= 45000;

		// Update individual alert state variables
		setShowTireAlert(tireAlert);
		setShowOilAlert(oilAlert);
		setShowBrakeAlert(brakeAlert);
		setShowBatteryAlert(batteryAlert);
		setShowFilterAlert(filterAlert);
		setShowBeltAlert(beltAlert);
		setShowSparkAlert(sparkAlert);
		setShowTransAlert(transAlert);

		// Set overall alerts state if any condition is met
		setShowAlerts(
			tireAlert ||
				oilAlert ||
				brakeAlert ||
				batteryAlert ||
				filterAlert ||
				beltAlert ||
				sparkAlert ||
				transAlert
		);
	}, [
		FLTirePressure,
		FRTirePressure,
		BLTirePressure,
		BRTirePressure,
		mileage,
		oilPercent,
		oilLastChange,
		oilLife,
		breakLastChange,
		batteryLastChange,
		filterLastChange,
		beltLastChange,
		sparkLastChange,
		transLastChange,
	]);

	useFocusEffect(
		useCallback(() => {
			// logic when screen is focused
			// update values from the database when the screen is focused
			console.log("Maintenance is focused");
			// If you need to manually trigger alerts after a DB fetch, call handleAlerts here or rely on the useEffect above.
		}, [])
	);

	const [showModal, setShowModal] = useState(false);
	const [servicedLife, setServicedLife] = useState(0);

	function toggleModal() {
		console.log(showModal);
		if (showModal) setShowModal(false);
		else setShowModal(true);
	}

	const handleSmartCarConnect = async () => {
		if (!selectedVehicleId) {
			alert("Please select a vehicle first.");
			return;
		}

		const userId = auth.currentUser?.uid;
		const tokenRef = doc(
			db,
			"users",
			userId,
			"vehicles",
			selectedVehicleId,
			"auth_tokens",
			"smart_car"
		);
		const tokenSnap = await getDoc(tokenRef);

		if (!tokenSnap.exists()) {
			console.log("No token for this vehicle. Starting SmartCar auth...");
			promptAsync(); // SmartCar login
		} else {
			console.log("Token exists, syncing vehicle data...");
			await fetchVehicleData(selectedVehicleId);
			Alert.alert("Vehicle data synced!");
		}
	};

	const handleSubmit = async () => {
		if (!selectedVehicleId) {
			alert("No vehicle selected.");
			return;
		}

		try {
			await addDoc(collection(db, "vehicles", selectedVehicleId, "maintenance"), {
				type: "Tire", // You can make this dynamic later
				mileage: mileage,
				servicedLife: servicedLife,
				servicedAt: new Date().toLocaleDateString(),
			});
			alert("Maintenance record added.");
			setShowModal(false);
			setServicedLife("");
		} catch (error) {
			console.error("Error saving maintenance record: ", error);
			alert("Failed to save record.");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<TopBar
				headingTitle="Maintenance"
				onSwitchPress={() => navigation.navigate("SelectVehicle")}
				pressableIcon={"filter"}
				iconFunction={() => navigation.navigate("MaintenanceFilters")}
			/>
			{selectedVehicle && (
				<Text style={styles.vehicleNameLabel}>
					{selectedVehicle.vehicleName || "Unnamed Vehicle"}
				</Text>
			)}

			<TouchableOpacity style={styles.button} onPress={handleSmartCarConnect}>
				<Text style={styles.buttonText}>Connect to SmartCar</Text>
			</TouchableOpacity>

			<ScrollView contentContainerStyle={styles.scrollContent}>
				{showAlerts && (
					<View style={styles.alertContainer}>
						{showTireAlert && <Text style={styles.alertText}>Check tire air pressure</Text>}
						{showBrakeAlert && <Text style={styles.alertText}>Check brakes for service</Text>}
						{showOilAlert && <Text style={styles.alertText}>Oil should be changed</Text>}
						{showBatteryAlert && <Text style={styles.alertText}>Check battery</Text>}
						{showFilterAlert && (
							<Text style={styles.alertText}>Cabin air filter should be replaced</Text>
						)}
						{showBeltAlert && <Text style={styles.alertText}>Check timing belt for service</Text>}
						{showSparkAlert && <Text style={styles.alertText}>Check spark plugs for service</Text>}
						{showTransAlert && (
							<Text style={styles.alertText}>Check transmission fluid for service</Text>
						)}
					</View>
				)}
				{showTires && (
					<Pressable onPress={() => toggleModal()}>
						<View style={styles.tirecontainer}>
							<Text style={styles.title}>Tires</Text>
							<View style={styles.lowerContainer}>
								<View style={styles.leftcontainer}>
									<View style={styles.innercontainer}>
										<Text style={styles.percentage}>{FLTirePressure}</Text>
										<View
											style={[styles.wheels, FLTirePressure < 20 && { backgroundColor: "#ff3030" }]}
										/>
									</View>
									<View style={styles.innercontainer}>
										<Text style={styles.percentage}>{BLTirePressure}</Text>
										<View
											style={[styles.wheels, BLTirePressure < 20 && { backgroundColor: "#ff3030" }]}
										/>
									</View>
								</View>
								<View style={styles.imagecontainer}>
									<Image
										source={require("../../assets/car.png")}
										style={{ height: 150, width: 73 }}
									/>
								</View>
								<View style={styles.rightcontainer}>
									<View style={styles.innercontainer}>
										<View
											style={[styles.wheels, FRTirePressure < 20 && { backgroundColor: "#ff3030" }]}
										/>
										<Text style={styles.percentage}>{FRTirePressure}</Text>
									</View>
									<View style={styles.innercontainer}>
										<View
											style={[styles.wheels, BRTirePressure < 20 && { backgroundColor: "#ff3030" }]}
										/>
										<Text style={styles.percentage}>{BRTirePressure}</Text>
									</View>
								</View>
							</View>
						</View>
					</Pressable>
				)}

				{showBrakePads && (
					<Card
						IconComponent={Image}
						icon="tire"
						iconSize={52}
						title="Break Pads"
						percentage={"N/A"}
						date="Serviced on 2/5/25"
						imgSource={require("../../assets/break.png")}
						style={{ height: 70, width: 70 }}
					/>
				)}

				{showOil && (
					<Card
						IconComponent={FontAwesome5}
						icon="oil-can"
						iconSize={42}
						title="Oil"
						percentage={"N/A"}
						date="Last changed: 2/8/25"
					/>
				)}

				{showBattery && (
					<Card
						IconComponent={MaterialCommunityIcons}
						icon="car-battery"
						iconSize={52}
						title="Battery"
						percentage={"N/A"}
						date="Rotate on 2/5/25"
						lifeType="years"
					/>
				)}

				{showFilter && (
					<Card
						IconComponent={MaterialCommunityIcons}
						icon="air-filter"
						iconSize={52}
						title="Air Filter"
						percentage="25%"
						date="Last changed: 2/8/25"
					/>
				)}

				{showTimingBelt && (
					<Card
						IconComponent={Image}
						icon="tire"
						iconSize={52}
						title="Timing Belt"
						percentage={"N/A"}
						date="Rotate on 2/5/25"
						imgSource={require("../../assets/timing-belt.png")}
						style={{ height: 70, width: 70 }}
					/>
				)}

				{showSparkPlugs && (
					<Card
						IconComponent={Image}
						icon="tire"
						iconSize={52}
						title="Spark Plugs"
						percentage={"N/A"}
						date="Rotate on 2/5/25"
						imgSource={require("../../assets/spark-plug.png")}
						style={{ height: 60, width: 60 }}
					/>
				)}

				{showTransFluid && (
					<Card
						IconComponent={Image}
						icon="tire"
						iconSize={52}
						title="Tranmission Fluid"
						percentage={"N/A"}
						date="Rotate on 2/5/25"
						imgSource={require("../../assets/engine-oil.png")}
						style={{ height: 70, width: 70 }}
					/>
				)}

				{showCoolant && (
					<Card
						IconComponent={Ionicons}
						icon="snow-outline"
						iconSize={52}
						title="Engine Coolant"
						percentage={"N/A"}
						date="Rotate on 2/5/25"
					/>
				)}
				{/* more cards later */}
			</ScrollView>
			<Modal visible={showModal} animationType="fade" transparent={true}>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Tire status</Text>
						<Text style={{ marginBottom: 5, fontSize: 16 }}>Tires Life (miles)</Text>
						<TextInput
							style={styles.input}
							placeholder=""
							placeholderTextColor={"#555"}
							// pull default value from db
							defaultValue="15000"
							value={servicedLife}
							onChangeText={setServicedLife}
							keyboardType="numeric"
							returnKeyType="done"
							blurOnSubmit={true}
							onSubmitEditing={Keyboard.dismiss}
						/>
						<Text style={{ color: "#555", fontSize: 12, marginBottom: -10 }}>
							Pressing confirm sets date and mileage serviced on this item to current
						</Text>
						<View style={styles.buttonContainer}>
							<TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
								<Text style={styles.buttonText}>Confirm</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.cancelButton} onPress={() => toggleModal()}>
								<Text style={styles.buttonText}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
			<BottomBar />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	scrollContent: {
		padding: 16,
		paddingTop: 40,
	},
	tirecontainer: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#CFD6E1",
		height: 200,
		borderRadius: 8,
		padding: 16,
		marginHorizontal: 20,
		marginBottom: 40,
	},
	lowerContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: 144,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		height: 24,
	},
	leftcontainer: {
		flex: 1,
		alignItems: "flex-end",
		justifyContent: "space-between",
		height: 120,
	},
	innercontainer: {
		borderColor: "#000",
		flex: 1,
		flexDirection: "row",
		marginTop: 22,
		gap: 8,
	},
	rightcontainer: {
		flex: 1,
		height: 120,
	},
	textContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: "70%",
	},
	percentage: {
		fontSize: 28,
		marginTop: -8,
	},
	wheels: {
		height: 25,
		width: 16,
		borderRadius: 5,
		backgroundColor: "#000",
	},
	date: {
		marginTop: 4,
		fontSize: 12,
		color: "#666",
	},
	popupback: {
		position: "absolute",
		top: 70,
		left: 0,
		flex: 1,
		height: "86%",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
	},
	popupfront: {
		height: 100,
		width: "70%",
		backgroundColor: "#dfdfdf",
		borderRadius: 15,
		alignItems: "center",
	},
	popuptext: {
		fontSize: 18,
		marginTop: 10,
	},
	button: {
		backgroundColor: "#4682B4",
		borderRadius: 5,
		padding: 10,
		width: "42%",
		marginLeft: 113,
		marginBottom: 2,
	},
	alertContainer: {
		backgroundColor: "#ff6969",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		padding: 10,
		marginHorizontal: 20,
		marginBottom: 40,
		gap: 8,
	},
	alertText: {
		fontSize: 16,
		backgroundColor: "#faa1a1",
		paddingVertical: 2,
		width: 300,
		textAlign: "center",
		borderRadius: 8,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		width: "90%",
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		padding: 20,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "#D9D9D9",
		borderRadius: 5,
		padding: 10,
		marginBottom: 15,
		fontSize: 16,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
	},
	addButton: {
		backgroundColor: "#4682B4",
		borderRadius: 5,
		padding: 10,
	},
	cancelButton: {
		backgroundColor: "#B0E0E6",
		borderRadius: 5,
		padding: 10,
	},
	buttonText: {
		color: "#FFFFFF",
		fontWeight: "bold",
		textAlign: "center",
	},
	vehicleNameLabel: {
		fontSize: 16,
		fontWeight: "600",
		textAlign: "center",
		marginTop: 10,
		marginBottom: 4,
		color: "#444",
	},
});
