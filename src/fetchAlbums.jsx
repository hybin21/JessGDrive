import React from 'react'
import axios from 'axios';
import {getAccessToken} from "./googleAuth.jsx";

export const fetchAlbums = async () => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) throw new Error("❌ Access token is missing. Please sign in.");

        const response = await axios.get(
            "https://photoslibrary.googleapis.com/v1/albums",
            {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: { pageSize: 10 }, // Get up to 20 albums
            }
        );

        return response.data.albums || []; // Return albums array
    } catch (error) {
        console.error("❌ Error fetching albums:", error.response?.data || error.message);
        return [];
    }
};