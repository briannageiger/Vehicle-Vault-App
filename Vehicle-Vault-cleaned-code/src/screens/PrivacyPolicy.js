import React from "react";
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

export default function PrivacyPolicyScreen() {
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar animated backgroundColor="#D9D9D9" />

            <TopBar headingTitle="Privacy Policy" showBack={true} />

            <ScrollView contentContainerStyle={styles.displayPrivacyPolicy}>

                <Text style={styles.heading}>Vehicle Vault Privacy Policy</Text>
                <Text style={styles.subheading}>Last Updated: March, 2025</Text>
                <Text style={styles.paragraph}>
                Welcome to Vehicle Vault (“we,” “our,” or “us”). Vehicle Vault is an all-in-one vehicle management application designed to help users track oil life, tire health,
                 car-related finances, and locate nearby dealerships if service is needed. We value your privacy and are committed to protecting your personal data.This Privacy
                  Policy explains what information we collect, how we use it, and your rights regarding that data. By using our mobile application (“App”) or related services
                   (collectively, the “Services”), you agree to the terms of this Privacy Policy.
                </Text>
                <Text style={styles.sectionHeading}>1. Information We Collect</Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Account Information</Text>{"\n"}
                    • <Text style={styles.listItem}>Email and Password: When you create an account, we collect your email address and a password to authenticate your account.</Text>{"\n"}
                    • <Text style={styles.listItem}>Age: The App is intended for users 16+. We do not knowingly collect personal information from individuals under 16.</Text>{"\n"}
                    <Text style={styles.bold}>Location Data</Text>{"\n"}
                    • <Text style={styles.listItem}>We may collect your device’s location to help you find nearby dealerships and services related to your vehicle. This data is used strictly for functional purposes within the App.</Text>{"\n"}
                    <Text style={styles.bold}>Preference Data</Text>{"\n"}
                    • <Text style={styles.listItem}>We store any preferences you set in the App, such as display settings or notification choices, to personalize your experience.</Text>{"\n"}
                    <Text style={styles.bold}>Vehicle Information</Text>{"\n"}
                    • <Text style={styles.listItem}>We use Smartcar API to gather relevant vehicle data (e.g., mileage, maintenance indicators) if you choose to connect your vehicle. This data is used to provide vehicle health and maintenance reminders.</Text>{"\n"}
                    <Text style={styles.bold}>Technical Information</Text>{"\n"}
                    • <Text style={styles.listItem}>Log Data: We may automatically collect certain information when you use the App, such as your device information, IP address, timestamps, and crash logs to help us diagnose technical issues and improve performance.</Text>
                    • <Text style={styles.listItem}>Firebase / Firestore: We use Firebase services (including Firestore) to store user data securely and to manage your account settings.</Text>{"\n"}
                </Text>

                <Text style={styles.sectionHeading}>2. How We Use Your Information</Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>To Provide Our Services</Text>{"\n"}
                    • <Text style={styles.listItem}>We use your data (e.g., email, vehicle information, location) to deliver the core functions of Vehicle Vault, such as vehicle maintenance tracking and dealership locator.</Text>{"\n"}
                    <Text style={styles.bold}>To Improve and Personalize the App</Text>{"\n"}
                    • <Text style={styles.listItem}>We analyze user interactions to enhance App features, fix bugs, and tailor the user experience to your preferences.</Text>{"\n"}
                    <Text style={styles.bold}>Account Management</Text>{"\n"}
                    • <Text style={styles.listItem}>We use your email and password to authenticate your account, assist with password resets, and manage your profile settings.</Text>{"\n"}
                    <Text style={styles.bold}>Compliance and Legal Obligations</Text>{"\n"}
                    • <Text style={styles.listItem}>We may process your data to comply with applicable laws, regulations, or legal processes.</Text>{"\n"}
                    <Text style={styles.bold}>Communication</Text>{"\n"}
                    • <Text style={styles.listItem}>We may use your email to send updates about our Services, such as App updates or changes to our Terms of Service and this Privacy Policy.</Text>{"\n"}
                </Text>

                <Text style={styles.sectionHeading}>3. How We Use Your Information</Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Service Providers</Text>{"\n"}
                    • <Text style={styles.listItem}>We share certain data with third-party services we use (e.g., Google Maps API, Smartcar API, and Firebase/Firestore) to operate essential functionalities. These third parties are bound by contractual obligations to protect your data.</Text>{"\n"}
                    <Text style={styles.bold}>Legal Requirements</Text>{"\n"}
                    • <Text style={styles.listItem}>We may disclose personal information if required by law, subpoena, or other legal processes, or if we have a good-faith belief that such action is necessary to protect our rights or comply with legal obligations.</Text>{"\n"}
                    <Text style={styles.bold}>Business Transfers</Text>{"\n"}
                    • <Text style={styles.listItem}>In the event of a merger, acquisition, or asset sale, your personal data may be transferred. We will provide notice before your personal data is transferred and becomes subject to a different privacy policy.</Text>{"\n"}{"\n"}
                    <Text style={styles.paragraph}>We do not sell or rent your personal information to third parties for marketing purposes.</Text>
                </Text>

                <Text style={styles.sectionHeading}>4. Data Security</Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.paragraph}>We take reasonable measures to protect your data from unauthorized access, alteration, disclosure, or destruction. Our security measures include, but are not limited to:</Text>{"\n"}
                    <Text style={styles.bold}></Text>{"\n"}
                    • <Text style={styles.listItem}>Encryption: We use industry-standard encryption to protect data in transit.</Text>
                    • <Text style={styles.listItem}>Secure Database Storage: We store user data in Firebase/Firestore, which employs robust security measures.</Text>{"\n"}
                    • <Text style={styles.listItem}>Limited Access: Only authorized personnel have access to user data.</Text>{"\n"}{"\n"}
                    <Text style={styles.paragraph}>While we strive to protect your personal data, no security system is 100% foolproof. You share information with us at your own risk.</Text>
                </Text>

                <Text style={styles.sectionHeading}>5. Data Retention</Text>
                <Text style={styles.paragraph}>
                    We retain your personal information as long as you maintain an account with us or as needed to provide the Services. 
                    If you choose to delete your account, we will remove your information from active databases in accordance with our 
                    data retention policies. However, we may retain certain data for legitimate business or legal purposes 
                    (e.g., backup archives, fraud prevention).
                </Text>

                <Text style={styles.sectionHeading}>6. Your Rights and Choices</Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bold}>Access and Update</Text>{"\n"}
                    • <Text style={styles.listItem}>You can review and edit your account information by logging into the App and updating your profile.</Text>{"\n"}
                    <Text style={styles.bold}>Delete Your Account</Text>{"\n"}
                    • <Text style={styles.listItem}>You may delete your account at any time. This will remove your personal data from our active databases.</Text>{"\n"}
                    <Text style={styles.bold}>Location Settings</Text>{"\n"}
                    • <Text style={styles.listItem}>You can adjust your device or App settings to disable location sharing if you no longer wish to share this data.</Text>{"\n"}
                    <Text style={styles.bold}>Opt-Out of Communications</Text>{"\n"}
                    • <Text style={styles.listItem}>You can opt out of certain email communications by following the unsubscribe link or contacting us directly.</Text>{"\n"}
                    <Text style={styles.bold}>Age Restriction</Text>{"\n"}
                    • <Text style={styles.listItem}>The App is intended for users aged 16 and above. If you believe we have inadvertently collected data from anyone under 16, please contact us, and we will delete that information promptly.</Text>
                </Text>

                <Text style={styles.sectionHeading}>7. International Data Transfers</Text>
                <Text style={styles.paragraph}>
                    Although our primary operations are in the United States (Michigan), your data may be processed in other locations as needed for service operations. We rely on legal mechanisms to ensure the adequate protection of transferred data.
                </Text>

                <Text style={styles.sectionHeading}>8. Third-Party Links</Text>
                <Text style={styles.paragraph}>
                    Our App may contain links to third-party websites or resources, such as dealership websites or external services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before sharing any personal data.
                </Text>

                <Text style={styles.sectionHeading}>9. Changes to This Privacy Policy</Text>
                <Text style={styles.paragraph}>
                    We may update this Privacy Policy from time to time. When we do, we will revise the “Last Updated” date at the top of this page. If we make material changes, we will notify you by email or through a prominent notice in the App.
                </Text>

                <Text style={styles.sectionHeading}>10. Contact Us</Text>
                <Text style={styles.paragraph}>
                    If you have any questions, concerns, or complaints regarding this Privacy Policy or our data handling practices, please contact us at:{"\n"}{"\n"}
                    • <Text style={styles.listItem}>Email: support@vehiclevault.com</Text>{"\n"}
                </Text>

                <Text style={styles.bold}>By using Vehicle Vault, you acknowledge that you have read and understood this Privacy Policy.</Text>
            </ScrollView>

            <BottomBar></BottomBar>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    displayPrivacyPolicy: {
        backgroundColor: '#ffffff',
        padding: 30,
        borderRadius: 12,
        elevation: 4, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 12,
    },
    subheading: {
        fontSize: 16,
        color: "#667",
        marginBottom: 20,
    },
    sectionHeading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    listItem: {
        marginLeft: 24,
    },
    bold: {
        fontWeight: "bold",
        fontSize: 16,
    },
    paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    },
})