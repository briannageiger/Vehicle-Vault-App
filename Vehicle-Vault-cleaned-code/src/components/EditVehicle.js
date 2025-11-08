// components/EditVehicleModal.js

import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export default function EditVehicleModal({
  visible,
  vehicle,
  onClose,
  onSave,
}) {
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [vehicleLife, setVehicleLife] = useState("");
  const [tradeInValue, setTradeInValue] = useState("");

  useEffect(() => {
    if (vehicle) {
      setFuelEfficiency(vehicle.fuelEfficiency || "");
      setVehicleLife(vehicle.vehicleLife || "");
      setTradeInValue(vehicle.tradeInValue || "");
    }
  }, [vehicle]);

  const handleSave = async () => {
    if (!vehicle?.id) return;

    try {
      const ref = doc(db, "vehicles", vehicle.id);
      await updateDoc(ref, {
        fuelEfficiency,
        vehicleLife,
        tradeInValue,
      });

      onSave({
        ...vehicle,
        fuelEfficiency,
        vehicleLife,
        tradeInValue,
      });

      Alert.alert("Vehicle updated");
      onClose();
    } catch (err) {
      console.error("Failed to update vehicle:", err);
      Alert.alert("Update failed");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Edit Vehicle</Text>

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

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
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
