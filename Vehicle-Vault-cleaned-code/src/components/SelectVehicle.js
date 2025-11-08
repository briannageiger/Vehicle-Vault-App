import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useVehicleContext } from "../utils/VehicleContext";
import { useNavigation } from "@react-navigation/native";

export default function SelectVehicleScreen() {
  const { vehicles, setSelectedVehicleId } = useVehicleContext();
  const navigation = useNavigation();

  const handleSelect = (id) => {
    setSelectedVehicleId(id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Vehicle</Text>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.vehicleItem}
            onPress={() => handleSelect(item.id)}
          >
            <Text style={styles.vehicleName}>
              {item.vehicleName || "Unnamed Vehicle"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  vehicleItem: {
    padding: 16,
    backgroundColor: "#eee",
    marginBottom: 10,
    borderRadius: 6,
  },
  vehicleName: { fontSize: 18 },
});
