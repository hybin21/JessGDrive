import axios from "axios";
import { getAccessToken } from "./googleAuth.jsx";

export const fetchPhotos = async ({ searchQuery, category, mediaType, startDate, endDate }) => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error("Access token is missing. Please sign in.");
        }

        let filters = {};

        // 🌟 Ensure category filter is correctly structured
        if (category && category !== "All Categories") {
            filters.contentFilter = { includedContentCategories: [category.toUpperCase()] };
        }

        if (mediaType && mediaType !== "All Media Types") {
            filters.mediaTypeFilter = { mediaTypes: [mediaType.toUpperCase()] };
        }

        if (startDate && endDate) {
            filters.dateFilter = {
                ranges: [
                    {
                        startDate: {
                            year: parseInt(startDate.split("-")[0]),
                            month: parseInt(startDate.split("-")[1]),
                            day: parseInt(startDate.split("-")[2])
                        },
                        endDate: {
                            year: parseInt(endDate.split("-")[0]),
                            month: parseInt(endDate.split("-")[1]),
                            day: parseInt(endDate.split("-")[2])
                        },
                    },
                ],
            };
        }

        console.log("Searching...", { filters });

        const response = await axios.post(
            "https://photoslibrary.googleapis.com/v1/mediaItems:search",
            { pageSize: 100, filters },
            { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } }
        );

        let photos = response.data.mediaItems || [];

        // 🌟 **Local Filtering using searchQuery**
        if (searchQuery) {
            photos = photos.filter(photo =>
                photo.filename.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return photos;
    } catch (error) {
        console.error("❌ Error fetching photos:", error.response?.data || error.message);
        return [];
    }
};
