import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TopBar({
	pressableIcon,
	iconFunction,
	headingTitle,
	onSwitchPress,
	onAddPress,
	showBack = false,
}) {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<View style={styles.leftGroup}>
				<Text style={styles.title}>{headingTitle}</Text>
			</View>

			<View style={styles.rightGroup}>
				{showBack && (
					<TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
						<MaterialCommunityIcons name="arrow-left" size={26} color="#000" />
					</TouchableOpacity>
				)}
				{onSwitchPress && (
					<TouchableOpacity onPress={onSwitchPress} style={styles.icon}>
						<Ionicons name="car" size={24} color="#000" />
					</TouchableOpacity>
				)}
				{onAddPress && (
					<TouchableOpacity onPress={onAddPress} style={styles.icon}>
						<Ionicons name="add" size={24} color="#000" />
					</TouchableOpacity>
				)}

				{pressableIcon && (
					<TouchableOpacity onPress={iconFunction} style={{ marginLeft: 12 }}>
						<Ionicons name={pressableIcon} size={24} color="black" />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 60,
		paddingHorizontal: 16,
		backgroundColor: "#D9D9D9",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: "#ccc",
	},
	leftGroup: {
		flexDirection: "row",
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginRight: 10,
	},
	rightGroup: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		paddingLeft: 10,
	},
});
