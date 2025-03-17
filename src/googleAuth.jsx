import { gapi } from "gapi-script";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const DISCOVERY_DOCS = ["https://photoslibrary.googleapis.com/$discovery/rest?version=v1"];
const SCOPES = "https://www.googleapis.com/auth/photoslibrary.readonly";

let authInstance = null;

export const loadAuth = () => {
    return new Promise((resolve, reject) => {
        gapi.load("client:auth2", async () => {
            try {
                await gapi.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES,
                });

                authInstance = gapi.auth2.getAuthInstance();
                resolve(authInstance);
            } catch (error) {
                console.error("❌ Error initializing Google API", error);
                reject(error);
            }
        });
    });
};

export const signIn = async () => {
    if (!authInstance) {
        await loadAuth();
    }

    try {
        const user = await authInstance.signIn();
        const token = user.getAuthResponse().access_token;
        localStorage.setItem("authToken", token); // ✅ Store token in localStorage
        return token;
    } catch (error) {
        console.error("❌ Sign-in failed:", error);
        return null;
    }
};

export const getAccessToken = () => {
    if (authInstance && authInstance.isSignedIn.get()) {
        return authInstance.currentUser.get().getAuthResponse().access_token;
    }

    return localStorage.getItem("authToken"); // ✅ Retrieve token from storage
};

export const refreshAccessToken = async () => {
    if (!authInstance) {
        await loadAuth();
    }

    try {
        const user = authInstance.currentUser.get();
        const newAuthResponse = await user.reloadAuthResponse(); // ✅ Refresh token
        localStorage.setItem("authToken", newAuthResponse.access_token);
        return newAuthResponse.access_token;
    } catch (error) {
        console.error("❌ Token refresh failed:", error);
        return null;
    }
};

export const signOut = async () => {
    if (authInstance) {
        await authInstance.signOut();
    }
    localStorage.removeItem("authToken"); // ❌ Remove token on logout
};
