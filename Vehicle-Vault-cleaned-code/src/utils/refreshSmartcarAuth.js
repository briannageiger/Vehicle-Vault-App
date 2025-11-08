import { storeAuthTokens } from "./storeAuthTokens";

export const refreshSmartCarTokens = async (refresh_token) => {
	try {
		const repsonse = await fetch(
			"https://g2lvcqg4se.execute-api.us-east-2.amazonaws.com/dev/refreshToken",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ refresh_token }),
			}
		);
		const data = await repsonse.json();
		if (data.access_token) {
			console.log("Token refreshed");
			storeAuthTokens("smart_car", data.access_token, data.refresh_token, data.expires_in);
			return data;
		} else {
			console.log("Error receiving token data", data);
		}
	} catch (err) {
		console.log("Error calling refresh token endpoint: ", err);
	}
};
