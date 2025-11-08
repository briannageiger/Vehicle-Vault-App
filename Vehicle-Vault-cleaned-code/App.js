import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FilterProvider } from "./src/utils/FilterContext";
import { VehicleProvider } from "./src/utils/VehicleContext";

// Screens
import WelcomeScreen from "./src/screens/Welcome";
import LogInScreen from "./src/screens/LogIn";
import RegisterScreen from "./src/screens/Register";
import MaintenanceScreen from "./src/screens/Maintenance";
import GarageScreen from "./src/screens/Garage";
import SettingsScreen from "./src/screens/Settings";
import NotificationsScreen from "./src/screens/Notifications";
import LocationSettingsScreen from "./src/screens/LocationSettings";
import DisplaySettingsScreen from "./src/screens/DisplaySettings";
import ChangePasswordScreen from "./src/screens/ChangePassword";
import PrivacyPolicyScreen from "./src/screens/PrivacyPolicy";
import TermsOfServicesScreen from "./src/screens/TermsOfServices";
import Map from "./src/screens/Map";
import Finances from "./src/screens/Finances";
import AddPayment from "./src/screens/AddPayment";
import Analytics from "./src/screens/Analytics";
import FilterScreen from "./src/screens/MaintenanceFilters";
import AddVehicleScreen from "./src/screens/AddVehicleScreen";
import { StatusBar } from "expo-status-bar";
import SelectVehicleScreen from "./src/components/SelectVehicle";


const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const FinancesStack = createStackNavigator();
const MaintenanceStack = createStackNavigator();
const GarageStack = createStackNavigator();
const SettingsStack = createStackNavigator();

function FinancesScreens() {
  return (
    <FinancesStack.Navigator screenOptions={{ headerShown: false }}>
      <FinancesStack.Screen name="FinanceMain" component={Finances} />
      <FinancesStack.Screen name="Analytics" component={Analytics} />
      <FinancesStack.Screen
        name="SelectVehicle"
        component={SelectVehicleScreen}
      />

      <FinancesStack.Screen
        name="AddPayment"
        component={AddPayment}
        options={{ headerShown: true }}
      />
    </FinancesStack.Navigator>
  );
}

function MaintenanceScreens() {
  return (
    <MaintenanceStack.Navigator screenOptions={{ headerShown: false }}>
      <MaintenanceStack.Screen
        name="MaintenanceMain"
        component={MaintenanceScreen}
      />
      <MaintenanceStack.Screen
        name="MaintenanceFilters"
        component={FilterScreen}
      />
      <MaintenanceStack.Screen
        name="SelectVehicle"
        component={SelectVehicleScreen}
      />
    </MaintenanceStack.Navigator>
  );
}

function GarageScreens() {
  return (
    <GarageStack.Navigator screenOptions={{ headerShown: false }}>
      <GarageStack.Screen name="GarageMain" component={GarageScreen} />
      <GarageStack.Screen name="AddVehicle" component={AddVehicleScreen} />
      <GarageStack.Screen
        name="SelectVehicle"
        component={SelectVehicleScreen}
      />
    </GarageStack.Navigator>
  );
}

function SettingsScreens() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsMain" component={SettingsScreen} />
      <SettingsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
      <SettingsStack.Screen
        name="LocationSettings"
        component={LocationSettingsScreen}
      />
      <SettingsStack.Screen
        name="DisplaySettings"
        component={DisplaySettingsScreen}
      />
      <SettingsStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <SettingsStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
      />
      <SettingsStack.Screen
        name="TermsOfServices"
        component={TermsOfServicesScreen}
      />
    </SettingsStack.Navigator>
  );
}

function MainScreensNav() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
    >
      <Tab.Screen name="Garage" component={GarageScreens} />
      <Tab.Screen name="Maintenance" component={MaintenanceScreens} />
      <Tab.Screen name="Finances" component={FinancesScreens} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Settings" component={SettingsScreens} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FilterProvider>
      <VehicleProvider>
        <SafeAreaProvider>
          <StatusBar backgroundColor="#D9D9D9" />
          <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
              <RootStack.Screen name="Welcome" component={WelcomeScreen} />
              <RootStack.Screen name="LogIn" component={LogInScreen} />
              <RootStack.Screen name="Register" component={RegisterScreen} />
              <RootStack.Screen name="Main" component={MainScreensNav} />
            </RootStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </VehicleProvider>
    </FilterProvider>
  );
}
