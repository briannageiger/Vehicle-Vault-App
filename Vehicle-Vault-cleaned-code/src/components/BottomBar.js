import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default function BottomBar() {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.navigate("Maintenance", { screen: "MaintenanceMain" })}
			>
				<SimpleLineIcons name="wrench" size={24} color="black" />
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate("Finances", { screen: "FinanceMain" })}>
				<Ionicons name="cash-outline" size={24} color="black" />
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate("Garage", { screen: "GarageMain" })}>
				<Ionicons name="home-outline" size={24} color="black" />
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate("Map")}>
				<FontAwesome name="map-o" size={24} color="black" />
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate("Settings", { screen: "SettingsMain" })}>
				<Ionicons name="settings-outline" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingVertical: 18,
		backgroundColor: "#D9D9D9",
	},
});
