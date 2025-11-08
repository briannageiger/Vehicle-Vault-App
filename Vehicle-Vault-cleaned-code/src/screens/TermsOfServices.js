import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";

export default function TermsOfServicesScreen() {

    return (
        <SafeAreaView style={styles.container}>
            
            <TopBar headingTitle="Terms of Services" showBack={true} />
            
            <ScrollView contentContainerStyle={styles.displayTermsOfServices}>

                <Text style={styles.heading}>Vehicle Vault TOS</Text>
                <Text style={styles.subheading}>Last Updated: March, 2025</Text>

                <Text style={styles.paragraph}>
                    Welcome to Vehicle Vault (the “App”). Vehicle Vault is an all-in-one vehicle management application that helps users track oil life, tire health, 
                    car-related finances, and locate nearby dealerships if service is needed. These Terms of Service (the “Terms”) govern your access to and use of 
                    Vehicle Vault (the “Service”).
                </Text>
                <Text style={styles.paragraph}>
                    By creating an account or otherwise using the Service, you agree to be bound by these Terms. If you do not agree, you may not access or use the Service.
                </Text>

                <Text style={styles.bold}>1. Acceptance of Terms</Text>
                <Text style={styles.paragraph}>
                    By creating an account, downloading, or using Vehicle Vault, you acknowledge that you have read, understood, and agree to be bound by these Terms and 
                    any additional guidelines referenced within. If you do not accept all of these Terms, you are prohibited from using the Service.
                </Text>

                <Text style={styles.bold}>2. Eligibility</Text>
                <Text style={styles.paragraph}>
                    • <Text style={styles.listItem}>Age Requirement: You must be at least 16 years old to use the Service.</Text>{"\n"}
                    • <Text style={styles.listItem}>Authority: By using the Service, you represent and warrant that you have the right, authority, and capacity to enter 
                        into these Terms and to abide by all of the terms and conditions set forth herein.</Text>
                </Text>

                <Text style={styles.bold}>3. Account Registration</Text>
                <Text style={styles.paragraph}>
                    • <Text style={styles.listItem}>Required Information: To access certain features of the Service, you will be required to create an account. During the 
                        registration process, you must provide a valid email address and password.</Text>{"\n"}
                    • <Text style={styles.listItem}>Account Security: You are responsible for maintaining the confidentiality of your account and password. You agree to 
                        notify us immediately of any unauthorized use of your account.</Text>{"\n"}
                    • <Text style={styles.listItem}>Account Deletion: You may delete your account at any time by following the account deletion procedure in the App or by 
                        contacting us.</Text>{"\n"}
                </Text>

                <Text style={styles.bold}>4. User Data and Privacy</Text>
                <Text style={styles.paragraph}>
                    • <Text style={styles.listItem}>Data Collection: By using the Service, you agree that Vehicle Vault may collect and process the following data:</Text>{"\n"}{"\n"}
                        • <Text style={styles.listItemInList}>Email address and password (for account creation and management)</Text>{"\n"}
                    • <Text style={styles.listItem}>Age Requirement: You must be at least 16 years old to use the Service.</Text>{"\n"}
                    • <Text style={styles.listItem}>Age Requirement: You must be at least 16 years old to use the Service.</Text>{"\n"}
                    • <Text style={styles.listItem}>Age Requirement: You must be at least 16 years old to use the Service.</Text>{"\n"}
                </Text>
                
                <Text style={styles.bold}>5. Third-Party Services</Text>
                <Text style={styles.paragraph}>
                    • <Text style={styles.listItem}>Google Maps API: We use Google Maps API to provide location-based services (e.g., dealership locations). Your use of 
                        Google Maps within the App is subject to Google’s Terms of Service.</Text>{"\n"}
                    • <Text style={styles.listItem}>Smartcar API: We use the Smartcar API to access certain vehicle data (e.g., mileage, vehicle health). Your use of the 
                        Smartcar API is subject to Smartcar’s Terms of Service.</Text>{"\n"}
                    • <Text style={styles.listItem}>No Control Over Third-Party Services: We do not control and are not responsible for the availability, accuracy, or 
                        reliability of these external services. Your interactions with any third-party service are solely between you and the third party.</Text>{"\n"}
                </Text>

                <Text style={styles.bold}>6. Use of the Service</Text>
                <Text style={styles.paragraph}>
                    • <Text style={styles.listItem}>Personal Use Only: The Service is provided for your personal, non-commercial use.</Text>{"\n"}
                    • <Text style={styles.listItem}>Prohibited Conduct: You agree not to: 1) Use the Service in violation of any applicable law, and 2) Attempt to gain 
                        unauthorized access to our systems or otherwise interfere with the functioning of the Service.</Text>{"\n"}
                    • <Text style={styles.listItem}>No User-Generated Content: Vehicle Vault does not currently host user-generated content beyond basic account information. 
                        Therefore, issues such as content moderation do not apply at this time.</Text>{"\n"}
                </Text>

                <Text style={styles.bold}>7. Intellectual Property</Text>
                <Text style={styles.paragraph}>
                    • <Text style={styles.listItem}>Ownership: Vehicle Vault and its content (excluding third-party content) are owned by or licensed to us and are protected 
                        by applicable intellectual property laws.</Text>{"\n"}
                    • <Text style={styles.listItem}>License: We grant you a limited, non-exclusive, non-transferable, revocable license to use the Service for its intended 
                        purpose, subject to these Terms.</Text>{"\n"}
                </Text>

                <Text style={styles.bold}>8. Limitation of Liability</Text>
                <Text style={styles.paragraph}>
                    • <Text style={styles.listItem}>Service Provided "As Is": The Service is provided on an “AS IS” and “AS AVAILABLE” basis without warranties of any kind, whether express or implied.</Text>{"\n"}
                    • <Text style={styles.listItem}>No Warranty of Accuracy: We do not warrant that the Service will be accurate, reliable, uninterrupted, secure, or error-free.</Text>{"\n"}
                    • <Text style={styles.listItem}>Vehicle-Related Data: All vehicle information (including maintenance alerts, location tracking, or dealership listings) is provided for informational purposes only. You acknowledge that the Service is not a substitute for professional vehicle maintenance or advice.</Text>{"\n"}
                    • <Text style={styles.listItem}>Limitation of Damages: To the fullest extent permitted by law, Vehicle Vault and its affiliates shall not be liable for any indirect, incidental, consequential, or exemplary damages arising out of or in connection with your use of the Service.</Text>{"\n"}
                </Text>

                <Text style={styles.bold}>9. Indemnification</Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.paragraph}>You agree to defend, indemnify, and hold harmless Vehicle Vault, its affiliates, and their respective directors, officers, employees, and agents from any and all claims, liabilities, costs, and expenses (including reasonable attorneys’ fees) arising out of or related to:</Text>{"\n"}
                    • <Text style={styles.listItem}>Your breach of these Terms</Text>{"\n"}
                    • <Text style={styles.listItem}>Your misuse of the Service</Text>{"\n"}
                    • <Text style={styles.listItem}>Your violation of any law or the rights of a third party</Text>{"\n"}
                </Text>

                <Text style={styles.bold}>10. Suspension and Termination</Text>
                <Text style={styles.paragraph}>
                    • <Text style={styles.listItem}>Right to Terminate: We reserve the right to suspend or terminate your account if you violate these Terms or engage in conduct that we determine is unlawful or harmful to others.</Text>{"\n"}
                    • <Text style={styles.listItem}>Effect of Termination: Upon termination, your right to use the Service will immediately cease. You may delete your account at any time, and upon deletion, we will remove your data from our active servers in accordance with our data retention policies</Text>{"\n"}
                </Text>

                <Text style={styles.bold}>11. Governing Law</Text>
                <Text style={styles.paragraph}>
                    These Terms shall be governed by and construed in accordance with the laws of the State of Michigan, USA, without regard to its conflict of law principles. Any disputes arising under or relating to these Terms shall be resolved exclusively in the state or federal courts located in Michigan, and you consent to personal jurisdiction and venue in these courts.
                </Text>

                <Text style={styles.bold}>12. Changes to These Terms</Text>
                <Text style={styles.paragraph}>
                    We reserve the right to modify or replace these Terms at any time. In the event of material changes, we will notify you by posting the new Terms within the App or by other reasonable means. Your continued use of the Service after such modifications have been made constitutes your acceptance of the new Terms.
                </Text>

                <Text style={styles.bold}>13. Contact Us</Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.paragraph}>If you have any questions or concerns about these Terms or the Service, please contact us at:</Text>{"\n"}
                    • <Text style={styles.listItem}>Email: support@vehiclevault.com</Text>{"\n"}
                </Text>

                <Text style={styles.bold}>By creating an account or using Vehicle Vault, you acknowledge that you have read and agree to these Terms of Service.</Text>

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
    displayTermsOfServices: {
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
        fontSize: 28,
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
        fontSize: 22,
        marginBottom: 6,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 12,
    },
})