import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { signOut, deleteUser } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
            navigation.replace("LogIn");
          } catch (error) {
            Alert.alert("Logout Error", error.message);
          }
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This will permanently delete your account and data. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (user) {
                await deleteDoc(doc(db, "users", user.uid));
                await deleteUser(user);
                navigation.replace("Register");
              } else {
                Alert.alert("Error", "No user is currently signed in.");
              }
            } catch (error) {
              Alert.alert("Delete Account Error", error.message);
            }
          },
        },
      ]
    );
  };

  const settingsOptions = [
    {
      label: "Notifications",
      icon: "bell",
      onPress: () => navigation.navigate("Notifications"),
    },
    {
      label: "Location Settings",
      icon: "map-marker",
      onPress: () => navigation.navigate("LocationSettings"),
    },
    {
      label: "Terms of Services",
      icon: "file-document-outline",
      onPress: () => navigation.navigate("TermsOfServices"),
    },
    {
      label: "Privacy Policy",
      icon: "shield-lock-outline",
      onPress: () => navigation.navigate("PrivacyPolicy"),
    },
    {
      label: "Change Password",
      icon: "lock-reset",
      onPress: () => navigation.navigate("ChangePassword"),
    },
    {
      label: "Log Out",
      icon: "logout",
      onPress: handleLogout,
    },
    {
      label: "Delete Account",
      icon: "delete-forever",
      onPress: handleDeleteAccount,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated backgroundColor="#D9D9D9" />

      <TopBar headingTitle="Settings" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {settingsOptions.map((item, index) => (
          <Pressable
            key={index}
            style={styles.settingItem}
            onPress={item.onPress}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={item.icon}
                size={26}
                color={"#000"}
              />
            </View>
            <Text style={styles.settingLabel}>{item.label}</Text>
          </Pressable>
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
  settingItem: {
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
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
});
