import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VehicleCard({ vehicle, onPress, onDelete }) {
  return (
    <View style={styles.vehicleCard}>
      <View style={styles.header}>
        <Text style={styles.vehicleName}>{vehicle.vehicleName}</Text>
        <TouchableOpacity onPress={() => onDelete(vehicle.id)}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.vehicleInfo}>
        <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} />
      </View>
      <View style={styles.vehicleDetails}>
        <Text>Fuel Efficiency: {vehicle.fuelEfficiency} MPG</Text>
        <Text>Trade-in Value: ${vehicle.tradeInValue}</Text>
        <TouchableOpacity style={styles.moreInfoButton} onPress={onPress}>
          <Text style={styles.moreInfoText}>More Vehicle Information</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vehicleCard: {
    marginBottom: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  vehicleInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  vehicleImage: {
    width: 100,
    height: 60,
    resizeMode: "contain",
  },
  vehicleDetails: {
    backgroundColor: "#B0E0E6",
    borderRadius: 5,
    padding: 10,
  },
  moreInfoButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#4682B4",
    borderRadius: 5,
    alignItems: "center",
  },
  moreInfoText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
