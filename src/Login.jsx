import React, { useState } from "react";
import { signIn, signOut, getAccessToken } from "./googleAuth.jsx";

const Login = ({ setToken }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const handleSignIn = async () => {
        try {
            await signIn();
            const token = getAccessToken();
            if (!token) {
                console.error("Failed to retrieve access token.");
                return;
            }
            setToken(token);
            setIsSignedIn(true);
        } catch (e) {
            console.error("Sign-in error:", e);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        setToken(null);
        setIsSignedIn(false);
    };

    return (
        <div>
            {isSignedIn ? (
                <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2">
                    Sign Out
                </button>
            ) : (
                <button onClick={handleSignIn} className="bg-blue-500 text-white px-4 py-2">
                    Sign in with Google
                </button>
            )}
        </div>
    );
};

export default Login;