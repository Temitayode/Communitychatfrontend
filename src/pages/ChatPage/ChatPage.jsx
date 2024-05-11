import React, { useEffect, useState } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "./../../components/sidebar/sidebar";

const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isResponsive, setIsResponsive] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsResponsive(window.innerWidth < 640);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = (e) => {
        e.stopPropagation();
        setSidebarOpen((prev) => !prev);
    };

    return (
        <div className='flex flex-col sm:flex-row sm:h-[450px] md:h-[550px] mt-1 sm:mt-16 mx-auto rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 mx-auto max-w-6xl relative'>
            {isResponsive ? (
                <>
                    {sidebarOpen && <Sidebar className="absolute left-0 top-0 h-full" />}
                    <MessageContainer className="relative" />

                    <button
                        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
                        onClick={toggleSidebar}
                    >
                        {sidebarOpen ? 'Close' : 'Open'} {/* Change button text based on sidebar state */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.707 3.293a1 1 0 0 1 1.414 1.414L8.414 10l3.707 3.707a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4z" clipRule="evenodd" />
                        </svg>
                    </button>

                </>
            ) : (
                <>
                    <Sidebar className="absolute" />
                    <MessageContainer className="relative top-0 right-0 bottom-0 left-0" />
                </>
            )}
        </div>
    );
};

export default Home;
