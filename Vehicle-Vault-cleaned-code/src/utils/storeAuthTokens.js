import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";

export async function storeAuthTokens(
  vehicleId,
  accessToken,
  refreshToken,
  ttl
) {
  const user = auth.currentUser;
  const userId = user.uid;
  try {
    const tokenDocRef = doc(
      db,
      "users",
      userId,
      "vehicles",
      vehicleId,
      "auth_tokens",
      "smart_car"
    );

    await setDoc(
      tokenDocRef,
      {
        accessToken,
        refreshToken,
        ttl,
        updateAt: new Date().toISOString(),
      },
      { merge: true }
    );
    console.log(`Stored tokens for vehicle: ${vehicleId}`);
  } catch (error) {
    console.log("Error storing vehicle-specific tokens: ", error);
  }
}

