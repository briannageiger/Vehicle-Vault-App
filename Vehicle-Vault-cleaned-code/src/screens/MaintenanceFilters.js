import React, { useContext } from "react";
import { SafeAreaView, TouchableOpacity, StyleSheet, View, Text } from "react-native";
import FilterCheckbox from "../components/FilterCheckbox";
import { FilterContext } from "../utils/FilterContext";
import TopBar from "../components/TopBar";

export default function FilterScreen({ navigation }) {
	const {
		showTimingBelt,
		setShowTimingBelt,
		showSparkPlugs,
		setShowSparkPlugs,
		showTransFluid,
		setShowTransFluid,
		showCoolant,
		setShowCoolant,
		showBattery,
		setShowBattery,
		showBrakePads,
		setShowBrakePads,
		showOil,
		setShowOil,
		showFilter,
		setShowFilter,
		showTires,
		setShowTires,
	} = useContext(FilterContext);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopBar headingTitle={"Maintenance Filters"} />
			<View style={styles.container}>
				<Text style={{ color: "#8F8F8F", marginBottom: 5 }}>Select items to display</Text>
				<View style={styles.filters}>
					<FilterCheckbox label="Show Tires" value={showTires} onValueChange={setShowTires} />
					<FilterCheckbox
						label="Show Break Pads"
						value={showBrakePads}
						onValueChange={setShowBrakePads}
					/>
					<FilterCheckbox label="Show Oil" value={showOil} onValueChange={setShowOil} />
					<FilterCheckbox label="Show Battery" value={showBattery} onValueChange={setShowBattery} />
					<FilterCheckbox
						label="Show Air Filter"
						value={showFilter}
						onValueChange={setShowFilter}
					/>
					<FilterCheckbox
						label="Show Timing Belt"
						value={showTimingBelt}
						onValueChange={setShowTimingBelt}
					/>
					<FilterCheckbox
						label="Show Spark Plugs"
						value={showSparkPlugs}
						onValueChange={setShowSparkPlugs}
					/>
					<FilterCheckbox
						label="Show Transmission Fluid"
						value={showTransFluid}
						onValueChange={setShowTransFluid}
					/>
					<FilterCheckbox label="Show Coolant" value={showCoolant} onValueChange={setShowCoolant} />
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
						<Text style={styles.buttonText}>Apply filters</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 40,
		justifyContent: "space-around",
	},
	filters: {
		height: "90%",
	},
	buttonContainer: {
		alignItems: "center",
	},
	button: {
		width: 300,
		height: 50,
		backgroundColor: "#007bff",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
	},
	buttonText: {
		textAlign: "center",
		fontSize: 16,
		color: "#fff",
	},
});
