import React, { useEffect, useState } from "react";
import { fetchAlbums } from "../fetchAlbums.jsx";
import AlbumCard from "../components/album-card.jsx";
import {useNavigate} from "react-router-dom";
const Albums = ({handleSignOut}) => {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAlbums = async () => {
            setIsLoading(true);
            const albumList = await fetchAlbums();
            setAlbums(albumList);
            setIsLoading(false);
        };

        loadAlbums();
    }, []);

    return (
        <div className ="flex flex-col p-10 items-center w-screen h-screen bg-gradient-to-b from-transparent to-[#9c9c9c] font-julius text-[#9c9c9c]/90">
            <div >
                <h1 className="text-2xl font-bold mb-4"><strong>Albums</strong></h1>
            </div>
            <div className="flex items-center space-x-4">
                <img src="sign-out.svg" alt="sign-out" className="w-8 cursor-pointer" onClick={handleSignOut} />
                <img src="Image.svg" alt="albums" className="w-8 cursor-pointer" onClick={() => navigate("/gallery")} />
            </div>
            <div>
                {isLoading ? (
                    <p className="text-gray-500">Loading albums...</p>
                ) : albums.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
                        {albums.map((album) => (
                            <AlbumCard key={album.id} album={album} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">No albums found.</p>
                )}
            </div>
        </div>

    );
};

export default Albums;
