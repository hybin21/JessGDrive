import React from "react";

const AlbumCard = ({ album }) => {
    if (!album) return null;

    // Function to open the album in Google Photos
    const openInGooglePhotos = () => {
        if (album.productUrl) {
            window.open(album.productUrl, "_blank"); // Opens in a new tab
        } else {
            console.error("❌ No product URL available for this album.");
        }
    };

    return (
        <div
            className="relative flex flex-col items-center bg-white shadow-lg shadow-[#D9D9D9] rounded-lg w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56 p-2 transition-all hover:rotate-1 hover:shadow-2xl hover:shadow-gray-900 border border-1 border-[#9c9c9c]/40 cursor-pointer"
            onClick={openInGooglePhotos} // Handle click event
        >
            {/* Polaroid Image */}
            <div className="overflow-hidden w-full h-48 sm:h-52 md:h-56 lg:h-60 xl:h-64 rounded-lg">
                <img
                    src={album.coverPhotoBaseUrl}
                    alt={album.title}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* Polaroid Caption */}
            <div className="w-full bg-white text-center p-2 rounded-b-lg">
                <p className="text-sm sm:text-base md:text-md text-gray-700 font-semibold">
                    {album.title}
                </p>
            </div>
        </div>
    );
};

export default AlbumCard;
