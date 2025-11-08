import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";
import { refreshSmartCarTokens } from "./refreshSmartcarAuth";

export const fetchVehicleData = async (selectedVehicleId) => {
	try {
		// 1. Get the currently authenticated user.
		const user = auth.currentUser;
		if (!user) {
			throw new Error("No authenticated user found");
		}
		const userId = user.uid;
		const service = "smart_car";

		// 2. Fetch token from Firestore
const tokenDocRef = doc(
  db,
  "users",
  userId,
  "vehicles",
  selectedVehicleId,
  "auth_tokens",
  "smart_car"
);		const docSnap = await getDoc(tokenDocRef);
		if (!docSnap.exists()) {
			console.log("No token data found for user.");
			return;
		}

		let { accessToken, refreshToken, ttl, updateAt } = docSnap.data();
		console.log("Token data:", docSnap.data());

		// 3. Refresh token if expired
		if (updateAt && ttl) {
			const DateUpdated = new Date(updateAt);
			const expirationTime = DateUpdated.getTime() + ttl * 1000;
			if (Date.now() > expirationTime) {
				console.log("Token expired, refreshing...");
				const newTokenData = await refreshSmartCarTokens(refreshToken);
				accessToken = newTokenData.access_token;
			} else {
				console.log("Token still valid");
			}
		} else {
			console.log("Missing TTL or update timestamp");
		}

		// 4. Fetch list of SmartCar-connected vehicles
		const vehiclesResponse = await fetch("https://api.smartcar.com/v1.0/vehicles", {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
		const vehiclesData = await vehiclesResponse.json();
		console.log("Vehicles list:", vehiclesData);

		if (!vehiclesData.vehicles || vehiclesData.vehicles.length === 0) {
			console.log("No vehicles connected.");
			return;
		}

		// Use selectedVehicleId if available, otherwise fall back to first SmartCar vehicle
		const vehicleId = selectedVehicleId || vehiclesData.vehicles[0];
		console.log("Using SmartCar vehicleId:", vehicleId);

		// 5. Fetch various endpoints from SmartCar
		const [vehicleInfo, odometerData, oilData, tireData, gasData] = await Promise.all([
			fetch(`https://api.smartcar.com/v1.0/vehicles/${vehicleId}`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			}).then(res => res.json()),

			fetch(`https://api.smartcar.com/v1.0/vehicles/${vehicleId}/odometer`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			}).then(res => res.json()),

			fetch(`https://api.smartcar.com/v2.0/vehicles/${vehicleId}/engine/oil`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			}).then(res => res.json()),

			fetch(`https://api.smartcar.com/v2.0/vehicles/${vehicleId}/tires/pressure`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			}).then(res => res.json()),

			fetch(`https://api.smartcar.com/v2.0/vehicles/${vehicleId}/fuel`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			}).then(res => res.json()),
		]);

		console.log("Vehicle Info:", vehicleInfo);
		console.log("Odometer:", odometerData);
		console.log("Oil:", oilData);
		console.log("Tires:", tireData);
		console.log("Fuel:", gasData);

		// 6. Save SmartCar data into Firestore under the selected vehicle
		const vehicleRef = doc(db, "vehicles", selectedVehicleId);
		await setDoc(
			vehicleRef,
			{
				smartcarData: {
					info: vehicleInfo,
					odometer: odometerData,
					oil: oilData,
					tires: tireData,
					fuel: gasData,
					lastSynced: new Date().toISOString(),
				},
			},
			{ merge: true }
		);

		console.log("SmartCar data successfully stored in Firestore.");
	} catch (error) {
		console.error("Error fetching vehicle data:", error);
	}
};
