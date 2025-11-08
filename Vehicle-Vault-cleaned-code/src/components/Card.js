import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Modal, Pressable, TextInput, Keyboard, TouchableOpacity } from "react-native";

export default function Card({
	title,
	percentage,
	date = "",
	icon = "",
	iconSize = 0,
	IconComponent,
	imgSource = "",
	style,
	lifeType = "miles"
}) {
	const [showModal, setShowModal] = useState(false);
	const [servicedLife, setServicedLife] = useState(0);

    const placeholderString = title.charAt(0) + title.substring(1).toLowerCase() + ` life (${lifeType})`;

	function toggleModal() {
		console.log(showModal);
		if (showModal) setShowModal(false);
		else setShowModal(true);
	}

    const handleSubmit = () => {

    }

	return (
		<>
			<Pressable onPress={() => toggleModal()}>
				<View style={styles.container}>
					<Text style={styles.title}>{title}</Text>
					<View style={styles.lowerContainer}>
						<View style={styles.icon}>
							<IconComponent
								source={imgSource}
								name={icon}
								size={iconSize}
								color="black"
								style={style}
							/>
						</View>
						<View style={styles.textContainer}>
							<Text style={styles.percentage}>{percentage}</Text>
							<Text style={styles.date}>{date}</Text>
						</View>
					</View>
				</View>
			</Pressable>
			<Modal visible={showModal} animationType="fade" transparent={true}>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>{`${title} Serviced?`}</Text>
						<Text style={{ marginBottom: 5, fontSize: 16 }}>{placeholderString}</Text>
						<TextInput
							style={styles.input}
							placeholder={placeholderString}
							placeholderTextColor={"#555"}
							// pull default value from db
							defaultValue="15000"
							value={servicedLife}
							onChangeText={setServicedLife}
							keyboardType="numeric"
							returnKeyType="done"
							blurOnSubmit={true}
							onSubmitEditing={Keyboard.dismiss}
						/>
						<Text style={{ color: "#555", fontSize: 12, marginBottom: -10 }}>
							Pressing confirm sets date and mileage serviced on this item to current
						</Text>
						<View style={styles.buttonContainer}>
							<TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
								<Text style={styles.buttonText}>Confirm</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.cancelButton} onPress={() => toggleModal()}>
								<Text style={styles.buttonText}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#CFD6E1",
		height: 200,
		borderRadius: 8,
		padding: 16,
		marginHorizontal: 20,
		marginBottom: 40,
	},
	lowerContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		height: 144,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		height: 26,
	},
	icon: {
		width: "30%",
		justifyContent: "center",
		alignItems: "center",
	},
	textContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: "70%",
	},
	percentage: {
		marginTop: 8,
		fontSize: 20,
	},
	date: {
		marginTop: 4,
		fontSize: 12,
		color: "#666",
	},
	imageIcon: {
		height: 70,
		width: 70,
	},
	none: {},
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
