import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { auth, db } from "../config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export default function AddVehicleByVIN({ visible, onClose, onAdd }) {
  const [vin, setVin] = useState("");
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [vehicleLife, setVehicleLife] = useState("");
  const [tradeInValue, setTradeInValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!vin || vin.length < 10) {
      Alert.alert(
        "Error",
        "Please enter a valid VIN (at least 10 characters)."
      );
      return;
    }
    if (!fuelEfficiency || !vehicleLife || !tradeInValue) {
      Alert.alert("Missing Info", "Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`
      );
      const data = await response.json();
      const result = data.Results?.[0];

      if (!result || !result.Make || !result.Model || !result.ModelYear) {
        Alert.alert(
          "Error",
          "Could not fetch vehicle data. Try a different VIN."
        );
        setLoading(false);
        return;
      }

      const vehicleName = `${result.ModelYear} ${result.Make} ${result.Model}`;
      const user = auth.currentUser;

      const vehicleData = {
        userId: user.uid,
        vehicleName,
        vin,
        fuelEfficiency,
        vehicleLife,
        tradeInValue,
        registerDate: new Date().toLocaleDateString(),
        maintenance: "No Maintenance Needed",
        image: "default_vehicle.png",
      };

      const docRef = await addDoc(collection(db, "vehicles"), vehicleData);
      onAdd({ id: docRef.id, ...vehicleData });

      Alert.alert("Success", `Vehicle ${vehicleName} added!`);
      onClose();
      setVin("");
      setFuelEfficiency("");
      setVehicleLife("");
      setTradeInValue("");
    } catch (error) {
      console.error("VIN registration error:", error);
      Alert.alert("Error", "Failed to register vehicle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Register by VIN</Text>

          <TextInput
            style={[styles.input, { color: "#111" }]}
            placeholder="Enter VIN"
            placeholderTextColor="#333"
            value={vin}
            onChangeText={setVin}
            autoCapitalize="characters"
            maxLength={17}
          />

          <TextInput
            style={[styles.input, { color: "#111" }]}
            placeholder="Fuel Efficiency (MPG)"
            placeholderTextColor="#333"
            value={fuelEfficiency}
            onChangeText={setFuelEfficiency}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { color: "#111" }]}
            placeholder="Vehicle Life (Miles)"
            placeholderTextColor="#333"
            value={vehicleLife}
            onChangeText={setVehicleLife}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { color: "#111" }]}
            placeholder="Trade-in Value (USD)"
            placeholderTextColor="#333"
            value={tradeInValue}
            onChangeText={setTradeInValue}
            keyboardType="numeric"
          />
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Register Vehicle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#111"
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    alignItems: "center",
    padding: 8,
  },
  cancelText: {
    color: "#888",
  },
});
