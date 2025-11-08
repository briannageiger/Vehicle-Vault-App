import { useEffect } from "react";
import * as AuthSession from "expo-auth-session";
import { storeAuthTokens } from "./storeAuthTokens";

const CLIENT_ID = "6020bae4-b2e3-4139-8e2f-8b524a5f6c92";
const discovery = {
	authorizationEndpoint: "https://connect.smartcar.com/oauth/authorize",
	tokenEndpoint: "https://auth.smartcar.com/oauth/token",
};
const redirectUri = AuthSession.makeRedirectUri({
	scheme: "vehiclevault",
	useProxy: "false",
});

export const useSmartCarAuth = () => {
	// Initialize the AuthRequest
	console.log("redirect uri: ", redirectUri);
	const [request, response, promptAsync] = AuthSession.useAuthRequest(
		{
			clientId: CLIENT_ID,
			scopes: [
				"read_alerts",
				"read_diagnostics",
				"read_engine_oil",
				"read_extended_vehicle_info",
				"read_fuel",
				"read_vehicle_info",
				"read_odometer",
				"read_tires",
				"read_vin",
			],
			redirectUri,
			extraParams: {
				prompt: "login", // This might be ignored by the provider.
			},
			preferEphemeral: true,
		},
		discovery
	);

	// handle OAuth response
	useAuthResponseHandler(response, redirectUri, exchangeTokenOnServer);

	return { request, promptAsync, response };
};

const useAuthResponseHandler = (response, redirectUri, exchangeTokenOnServer) => {
	useEffect(() => {
		if (response?.type === "success" && response.params.code) {
			console.log("Authorization code:", response.params.code);
			// Call your serverless function to exchange the code
			exchangeTokenOnServer(response.params.code, redirectUri).then((accessToken) => {
				if (accessToken) {
					// Optionally, you can handle the access token here or pass it to a callback
					console.log("Access token received:", accessToken);
				}
			});
		} else if (response?.type === "error") {
			console.error("Authentication error:", response);
		}
	}, [response, redirectUri]);
};

export const exchangeTokenOnServer = async (code, redirectUri) => {
	try {
		const response = await fetch(
			"https://g2lvcqg4se.execute-api.us-east-2.amazonaws.com/dev/exchangeToken",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ code, redirectUri }),
			}
		);
		console.log("Access code: ", code);
		console.log("redirectUri: ", redirectUri);
		const data = await response.json();
		console.log("Token data: ", data);
		if (data.access_token) {
			console.log("Access token received from server:", data.access_token);
			storeAuthTokens("smart_car", data.access_token, data.refresh_token, data.expires_in);
		} else {
			console.error("Error from token exchange:", data);
			return null;
		}
	} catch (error) {
		console.error("Error calling token exchange endpoint:", error);
		return null;
	}
};
