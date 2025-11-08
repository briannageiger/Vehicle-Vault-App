import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Text,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function NotificationsScreen() {
  const navigation = useNavigation();

  // list of notification options, both initially set to be disabled
  const [pushEnabled, setPushEnabled] = useState(false);

  const NOTI_CATEGORIES = [
    {
      title: "Maintenance",
      options: [
        {id: "reminders", label: "Upcoming Maintenance Reminders", enabled: false },
        {id: "overdue", label: "Overdue Maintenance Alerts", enabled: false },
        {id: "oilChange", label: "Oil Change Reminders", enabled: false },
      ],
    },
    {
      title: "Finance",
      options: [
        {id: "paymentDue", label: "Upcoming Payment Reminders", enabled: false},
        {id: "latePayment", label: "Late Payment Alerts", enabled: false },
      ],
    },
    {
      title: "Garage",
      options: [
        {id: "vehicleAdded", label: "New Vehicle Added to Garage", enabled: false},
        {id: "milageMilestone", label: "Vehicle Mileage Milestone Alerts", enabled: false},
      ],
    },
    
  ];

  // stores the differnet notifcation categories
  const [categories, setCategories] = useState(NOTI_CATEGORIES);

  // these are which categories are currently being expanded
  const [expandedCategories, setExpandedCategories] = useState([])

  const toggleExpand = (categoryIndex) => {
    if (expandedCategories.includes(categoryIndex)) {
      setExpandedCategories(expandedCategories.filter((index)=> index !== categoryIndex));
    } else {
      setExpandedCategories([...expandedCategories, categoryIndex]);
    }

  };

  const toggleOption = (categoryIndex, optionID) => {
    const newCategories = [...categories];

    const options = newCategories[categoryIndex].options;
    const optionIndex = options.findIndex((o) => o.id === optionID);

    options[optionIndex].enabled = !options[optionIndex].enabled;

    setCategories(newCategories);
  };

  // determines if user has any type of notis enabled
  // if they do, then it will display the different categories
  // if not, then they will remain hidden
  const anyNotificationEnabled = pushEnabled;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated backgroundColor="#D9D9D9" />
      <TopBar headingTitle="Notifications" showBack={true} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Different Types of notification selection */}

        <View style={styles.masterToggleRow}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="bell-outline" size={26} color="#000" />
          </View>
          <Text style={styles.masterToggleLabel}>Enable Push Notifications</Text>
          <Switch value={pushEnabled} onValueChange={() => setPushEnabled((prev) => !prev)} />
        </View>

        {/* SUB-CATEGORIES (MAINTENANCE, FINANCE, GARAGE) */}
        {anyNotificationEnabled && (
          <>
            <Text style={styles.subHeader}>Customize Notifications:</Text>

            {categories.map((cat, catIndex) => {
              const isExpanded = expandedCategories.includes(catIndex);
              return (
                <View key={cat.title} style={styles.categoryWrapper}>
                  {/* CATEGORY HEADER */}
                  <Pressable style={styles.categoryHeader} onPress={() => toggleExpand(catIndex)}>
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons name={cat.icon} size={26} color="#000" />
                    </View>
                    <Text style={styles.categoryLabel}>{cat.title}</Text>
                    <MaterialCommunityIcons
                      name={isExpanded ? "chevron-up" : "chevron-down"}
                      size={26}
                      color="#000"
                    />
                  </Pressable>

                  {/* SUB-OPTIONS (these only show when category is expanded) */}
                  {isExpanded && (
                    <View style={styles.subOptionsContainer}>
                      {cat.options.map((item) => (
                        <View key={item.id} style={styles.notificationItem}>
                          <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name={item.icon} size={26} color="#000" />
                          </View>
                          <Text style={styles.notificationLabel}>{item.label}</Text>
                          <Switch
                            value={item.enabled}
                            onValueChange={() => toggleOption(catIndex, item.id)}
                          />
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </>
        )}
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

  /* NOTI TYPE TOGGLES */
  masterToggleRow: {
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
  masterToggleLabel: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },

  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 8,
  },

  /* CATEGORY */
  categoryWrapper: {
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dcdcdc",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryLabel: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
  },

  /* SUB OPTIONS */
  subOptionsContainer: {
    marginTop: 8,
    marginLeft: 16,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationLabel: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
});