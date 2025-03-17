import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Gallery from "./pages/Gallery.jsx";
import Intro from "./pages/Intro.jsx";
import { signOut , getAccessToken } from "./googleAuth.jsx";
import Albums from "./pages/Albums.jsx";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("authToken") || null);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if(storedToken) setToken(storedToken);
        else{
            const refreshedToken = getAccessToken();
            if(refreshedToken) setToken(refreshedToken);
        }
    },[]);

    const handleSignOut = async () => {
        await signOut();
        localStorage.removeItem("authToken");
        setToken(null);
    };

    return (
        <Router basename="/JessGDrive">
            <div className="flex items-center justify-center bg-white shadow-lg rounded-xl w-full min-h-screen">
                <Routes>
                    <Route path="/" element={token ? <Navigate to="/gallery" /> : <Intro setToken={setToken} />} />
                    <Route path="/gallery" element={token ? <Gallery token={token} handleSignOut={handleSignOut} /> : <Navigate to="/" />} />
                    <Route path="/albums" element={token ? <Albums  handleSignOut={handleSignOut}  /> : <Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;