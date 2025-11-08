import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Modal, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	collection,
	addDoc,
	query,
	where,
	getDocs,
	doc,
	deleteDoc,
	getDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig"; // Import Firestore and Auth
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import VehicleCard from "../components/VehicleCard";

export default function AddVehicleScreen() {
	const handleAddVehicle = async (newVehicle) => {
		if (!user) {
			console.log("No user logged in");
			return;
		}

		try {
			const vehicleData = {
				userId: user.uid,
				vehicleName: newVehicle.vehicleName,
				vin: newVehicle.vin,
				fuelEfficiency: newVehicle.fuelEfficiency,
				vehicleLife: newVehicle.vehicleLife,
				tradeInValue: newVehicle.tradeInValue,
				registerDate: new Date().toLocaleDateString(),
				maintenance: "No Maintenance Needed",
				image: newVehicle.image || "default_vehicle.png",
			};

			const docRef = await addDoc(collection(db, "vehicles"), vehicleData);
			console.log("Vehicle added with ID:", docRef.id);
			setVehicles((prevVehicles) => [...prevVehicles, { id: docRef.id, ...vehicleData }]);
		} catch (error) {
			console.error("Error adding vehicle:", error);
		}
	};

	return (
		<>
			<TopBar headingTitle="Add Vehicle" />
			<SafeAreaView style={styles.container}>
				<View style={styles.textcontainer}>
					<Text style={styles.instructTitleText}>There are three ways to add your vehicle!</Text>
					<Text style={styles.instructText}>
						If you have a smart vehicle, use SmartCar Connect to connect to your vehicle's
						live data.
					</Text>
					<Text style={styles.instructText}>
						If you have an older vehicle you can use VIN entry to add your vehicle
						and its information will be automatically entered. Otherwise, you can enter all vehicle
						information manually.
					</Text>
				</View>
				<View style={styles.buttoncontainer}>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>SmartCar Connect</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>VIN Entry</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Manual Entry</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 40,
		justifyContent: "space-around",
		alignItems: "center",
	},
	textcontainer: {
		alignItems: "center",
		justifyContent: "center",
		gap: 5,
		paddingHorizontal: 3,
	},
	instructTitleText: {
		fontSize: 20,
		color: "#007bff",
		marginBottom: 10,
	},
	instructText: {
		fontSize: 20,
		textAlign: "center",
	},
	buttoncontainer: {
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		padding: 15,
		marginBottom: -110,
	},
	button: {
		width: 320,
		height: 50,
		backgroundColor: "#4682B4",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		textAlign: "center",
		fontSize: 16,
		color: "#fff",
	},
});
