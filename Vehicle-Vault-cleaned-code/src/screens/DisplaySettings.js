import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function DisplaySettingsScreen() {
    const navigation = useNavigation();

    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    const displaySettingsOptions = [
        {
            label: "Enable Dark Mode",
            icon: "moon-waning-crescent",
            value: darkModeEnabled,
            onValueChange: () => setDarkModeEnabled((prev) => !prev),
        },
    ]

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar animated backgroundColor="#D9D9D9" />

            <TopBar headingTitle="Display Settings" showBack={true}/>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {displaySettingsOptions.map((item, index) => (
                    <View key={index} style={styles.displaySettingsItem}>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name={item.icon} size={26} color="#000" />
                        </View>
                        <Text style={styles.displaySettingsLabel}>
                            {item.label}
                        </Text>
                        <Switch
                            value={item.value}
                            onValueChange={item.onValueChange}
                        />
                    </View>
                ))}
            </ScrollView>

            <BottomBar></BottomBar>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        padding: 16,
        paddingTop: 40,
    },
    displaySettingsItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        paddingVertical: 16,
        paddingHorizontal: 12,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
      iconContainer: {
        marginRight: 12,
      },
      displaySettingsLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
      },

})