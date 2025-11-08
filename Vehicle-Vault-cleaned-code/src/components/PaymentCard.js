import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function PaymentCard({
  category,
  name,
  amount,
  date,
  notes,
  id,
  onDelete,
}) {
  const formattedDate = date ? date.split("-") : ["00", "00", "0000"];
  const [month, day, year] = formattedDate;

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => {
            onDelete(id);
            console.log("Delete pressed.");
          }}
        >
          <MaterialCommunityIcons name={"delete"} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.leftView}>
          <Text style={styles.text}>{category}</Text>
          <Text style={styles.text}>{notes}</Text>
        </View>
        <View style={styles.rightView}>
          <Text style={styles.text}>${parseFloat(amount).toFixed(2)}</Text>
          <Text style={styles.text}>
            {month}/{day}/{year}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#D9D9D9",
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  upperContainer: {
    display: "flex",
    flexDirection: "row",
  },
  name: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 5,
  },
  deleteBtn: {
    flex: 1,
    alignItems: "flex-end",
    marginBottom: 5,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  leftView: {
    flex: 1,
  },
  rightView: {
    flex: 1,
    alignItems: "flex-end",
    textAlignVertical: "top",
    includeFontPadding: false,
  },
  text: {
    fontSize: 16,
  },
});
