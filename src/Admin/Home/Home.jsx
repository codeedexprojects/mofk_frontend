import React from 'react';
import { Outlet } from "react-router-dom";
import { AppSidebar } from '../Components/Sidebar/Sidebar';
import { AppNavbar } from '../Components/Navbar/Navbar';

const Home = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex-shrink-0">
                <AppSidebar />
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-shrink-0">
                    <AppNavbar />
                </div>

                <div className="flex-1 overflow-y-auto bg-tertiary p-4 lg:p-8 border-l border-t border-gray-300">
                    <Outlet />
                </div>
            </div>
        </div>

    );
};

export default Home;
