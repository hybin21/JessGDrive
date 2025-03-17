import React, { useEffect, useState } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import PhotoCard from "../components/photo-card.jsx";
import { fetchPhotos } from "../fetchPhotos.jsx";
import {getAccessToken} from "../googleAuth.jsx";

const Gallery = ({ token, handleSignOut }) => {
    const navigate = useNavigate();

    const [savedToken, setSavedToken] = useState(token || getAccessToken());
    const [photos, setPhotos] = useState([])
    const [searchQuery,setSearchQuery] = useState(localStorage.getItem("searchQuery") || "");
    const [category, setCategory] = useState(localStorage.getItem("category") || "");
    const [mediaType, setMediaType] = useState(localStorage.getItem("mediaType") || "");
    const [startDate, setStartDate] = useState(localStorage.getItem("startDate") || "");
    const [endDate, setEndDate] = useState(localStorage.getItem("endDate") || "");
    const [isLoading, setIsLoading] = useState(false);
    const contentCategories = [
        "ANIMALS", "ARTS", "BIRTHDAYS", "CITYSCAPES", "CRAFTS", "DOCUMENTS",
        "FASHION", "FLOWERS", "FOOD", "GARDENS", "HOLIDAYS", "HOUSES",
        "LANDMARKS", "LANDSCAPES", "NIGHT", "PEOPLE", "PERFORMANCES",
        "PETS", "RECEIPTS", "SCREENSHOTS", "SELFIES", "SPORT",
        "TRAVEL", "UTILITY", "WEDDINGS", "WHITEBOARDS"
    ];
    const mediaTypes = ["PHOTO", "VIDEO"];


    useEffect(() =>{
        if(token){
            localStorage.setItem("authToken",token);
            setSavedToken(token);
        }
    },[token]);
    useEffect(() => {
        if(savedToken) handleSearch();
        else navigate("/");
    },[savedToken]);

    // const fetchRecentPhotos = async () => {
    //     if(!savedToken) return;
    //     setIsLoading(true);
    //     const recentPhotos = await fetchPhotos({
    //         searchQuery: "",
    //         category: "",
    //         mediaType: "",
    //         startDate: "",
    //         endDate: "",
    //         token: savedToken,
    //     });
    //     setPhotos(recentPhotos || []);
    //     setIsLoading(false);
    // }
    const handleSearch = async() => {
        localStorage.setItem("searchQuery",searchQuery);
        localStorage.setItem("category",category);
        localStorage.setItem("mediaType",mediaType);
        localStorage.setItem("startDate",startDate);
        localStorage.setItem("endDate",endDate);
        if(!savedToken) return;
        setIsLoading(true);
        const fetchedPhotos = await fetchPhotos({
            searchQuery,
            category,
            mediaType,
            startDate,
            endDate,
            token:savedToken,
        });
        setPhotos(fetchedPhotos || []);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col p-30 items-center w-screen h-screen bg-gradient-to-b from-transparent to-[#9c9c9c] font-julius text-[#9c9c9c]/90">
            {/* Search Bar & Filters */}
            <div className="flex justify-center items-center w-full max-w-6xl gap-4 mb-10 flex-wrap">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search photos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-5 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white"
                />

                {/* Category Dropdown */}
                <select
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {contentCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {/* Media Type Dropdown */}
                <select
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value)}
                >
                    <option value="">All Media Types</option>
                    {mediaTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                {/* Start Date Picker */}
                <input
                    type="date"
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                {/* End Date Picker */}
                <input
                    type="date"
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />

                {/* Search & Logout Buttons */}
                <img src="Search.svg" alt = "search" className = "w-8" onClick={handleSearch}/>
                <img src="sign-out.svg" alt = "sign-out" className ="w-8" onClick={handleSignOut}/>
                <img src="folder.svg" alt = "albums" className = "w-8" onClick={() => navigate("/albums")}/>
            </div>

            {/* Display Photos */}
            {isLoading ? (
                <p className="text-gray-500 mt-4">Loading photos...</p>
            ) : Array.isArray(photos) && photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
                    {photos.map((photo) => (
                        <PhotoCard key={photo.id} photo={photo} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 mt-4">No photos found.</p>
            )}
        </div>
    );
};

export default Gallery;
