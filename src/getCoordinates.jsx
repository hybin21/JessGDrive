import axios from "axios";

/**
 * Fetches latitude and longitude for a given location using OpenStreetMap API
 * @param {string} locationName - The name of the location (e.g., "Los Angeles")
 * @returns {Promise<{lat: number, lon: number} | null>} - Returns latitude & longitude or null if not found
 */
export const getCoordinates = async (locationName) => {
    try {
        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: locationName,
                format: "json",
                limit: 1,
            },
        });

        if (response.data.length > 0) {
            return {
                lat: parseFloat(response.data[0].lat),
                lon: parseFloat(response.data[0].lon),
            };
        }

        return null;
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
};
