import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Switch,
} from "react-native";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LocationSettingsScreen() {

    const [locationEnabled, setLocationEnabled] = useState(false); // defaults as off

    useEffect(() => {
      (async () => {
        try {
          const storedValue = await AsyncStorage.getItem("locationEnabled");
          if (storedValue !== null) {
            setLocationEnabled(JSON.parse(storedValue));
          }
        } catch (err) {
          console.warn("Failed to load stored location setting:", err);
        }
      })();
    }, []);

    const handleToggle = async (newValue) => {
      setLocationEnabled(newValue);
      try {
        await AsyncStorage.setItem("locationEnabled", JSON.stringify(newValue));
      } catch (err) {
        console.warn("Failed to save location setting:", err);
      }
    };

    const locationSettingsOptions = [
      {
        label: "Enable Location Services",
        icon: "map",
        value: locationEnabled,
        onValueChange: handleToggle,
      },
    ];

    return (
        <SafeAreaView style={styles.container}>
          <StatusBar animated backgroundColor="#D9D9D9" />
    
          <TopBar headingTitle="Location Settings" showBack={true}/>
    
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {locationSettingsOptions.map((item, index) => (
              <View key={index} style={styles.locationItem}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name={item.icon} size={26} color="#000" />
                </View>
                <Text style={styles.locationLabel}>{item.label}</Text>
                <Switch
                  value={item.value}
                  onValueChange={item.onValueChange}
                />
              </View>
            ))}
          </ScrollView>
    
          <BottomBar />
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
      locationItem: {
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
      locationLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
      },
});