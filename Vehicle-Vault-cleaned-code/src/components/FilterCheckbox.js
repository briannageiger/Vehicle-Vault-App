import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function FilterCheckbox({ label, value, onValueChange }) {
    return (
        <Pressable style={styles.row} onPress={() => onValueChange(!value)}>
            <MaterialCommunityIcons
                name={value ? "checkbox-marked" : "checkbox-blank-outline"}
                size={24}
                color="black"
            />
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    label: {
        marginLeft: 8,
        fontSize: 16,
    },
});
