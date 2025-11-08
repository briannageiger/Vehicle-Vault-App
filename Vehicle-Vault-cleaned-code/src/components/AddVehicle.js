import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Keyboard,
} from "react-native";

export default function AddVehicle({ visible, onClose, onAdd }) {
  const [vehicleName, setVehicleName] = useState("");
  const [vin, setVin] = useState("");
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [vehicleLife, setVehicleLife] = useState("");
  const [tradeInValue, setTradeInValue] = useState("");

  const handleSubmit = () => {
    if (!vin || !fuelEfficiency || !vehicleLife || !tradeInValue) {
      alert("All fields are required!");
      return;
    }

    const newVehicle = {
      vehicleName,
      vin,
      fuelEfficiency,
      vehicleLife,
      tradeInValue,
    };

    onAdd(newVehicle);
    onClose();
    setVehicleName("");
    setVin("");
    setFuelEfficiency("");
    setVehicleLife("");
    setTradeInValue("");
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Vehicle</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Vehicle Name"
            placeholderTextColor={"#555"}
            value={vehicleName}
            onChangeText={setVehicleName}
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter VIN"
            placeholderTextColor={"#555"}
            value={vin}
            onChangeText={setVin}
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            placeholder="Fuel Efficiency (MPG)"
            placeholderTextColor={"#555"}
            value={fuelEfficiency}
            onChangeText={setFuelEfficiency}
            keyboardType="numeric"
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            placeholder="Vehicle Life (miles)"
            placeholderTextColor={"#555"}
            value={vehicleLife}
            onChangeText={setVehicleLife}
            keyboardType="numeric"
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={Keyboard.dismiss}
          />
          <TextInput
            style={styles.input}
            placeholder="Trade-in Value ($)"
            placeholderTextColor={"#555"}
            value={tradeInValue}
            onChangeText={setTradeInValue}
            keyboardType="numeric"
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={Keyboard.dismiss}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add Vehicle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
});
