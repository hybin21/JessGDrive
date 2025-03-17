import React from "react";
import { signIn, getAccessToken } from "../googleAuth.jsx";

const Intro = ({ setToken }) => {
    const handleSignIn = async () => {
        try {
            await signIn();
            const token = getAccessToken();
            if (token) {
                localStorage.setItem("authToken", token); // Store token in localStorage
                setToken(token);
            } else {
                console.error("❌ Failed to retrieve access token.");
            }
        } catch (e) {
            console.error("❌ Sign-in error:", e);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen w-screen ">
            <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-b from-transparent to-[#9c9c9cb3]  rounded-xl
                p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16">
                <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="w-40 h-40 mb-3 sm:w-60 sm:h-60 sm:mb-4 md:w-66 md:h-66 md:mb-6 lg:w-72 lg:h-72 lg:mb-8 xl:w-80 xl:h-80 xl:mb-10"
                         viewBox="0 0 308 313" fill="none">
                        <path d="M36.1851 310.3H271.903C290.501 310.3 305.578 294.979 305.578 276.081V36.5475C305.578 17.6489 290.501 2.32849 271.903 2.32849H36.1851C17.5875 2.32849 2.51108 17.6489 2.51108 36.5475V276.081C2.51108 294.979 17.5875 310.3 36.1851 310.3ZM36.1851 310.3L221.392 122.095L305.578 207.643M120.37 96.4308C120.37 110.605 109.063 122.095 95.1147 122.095C81.1665 122.095 69.8592 110.605 69.8592 96.4308C69.8592 82.2568 81.1665 70.7665 95.1147 70.7665C109.063 70.7665 120.37 82.2568 120.37 96.4308Z"
                              stroke="#9c9c9c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="bg-[#ffffffb10] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20
                        py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16
                        rounded-[10px] shadow-md text-center flex flex-col items-center
                        w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[35vw] xl:w-[30vw] max-w-lg border border-2 border-[#9c9c9c] hover:bg-white/30  transform duration-300 ease-in-out">
                        <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
                            font-julius text-gray-800 leading-tight mb-4">
                            WELCOME TO <br /> JESS’S DRIVE
                        </h1>
                        <button onClick={handleSignIn} className="mt-4 px-4 sm:px-6 lg:px-8 xl:px-10 py-2
                            text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
                            bg-transparent text-gray-900 rounded-md font-julius
                            hover:bg-gray-900 hover:text-white  transition hover:duration-500 ">
                            SIGN IN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;