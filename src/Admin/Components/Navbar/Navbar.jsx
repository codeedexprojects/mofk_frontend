import {
    Navbar,
} from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import Profile from "./Profile";
import { IoNotificationsOutline } from "react-icons/io5";
import { AppContext } from "../../../StoreContext/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AppNavbar() {

    const { BASE_URL } = useContext(AppContext);
    const [newOrders, setNewOrders] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchNewOrdersCount = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/admin/dashboard/view-Counts`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                const count = response.data?.recentOrders?.[0]?.recentOrderCount || 0;
                setNewOrders(count);

            } catch (error) {
                console.log("Notification Fetch Error:", error);
            }
        };

        fetchNewOrdersCount();

        // Auto-refresh every 20 seconds
        const interval = setInterval(fetchNewOrdersCount, 300000);

        return () => clearInterval(interval);
    }, [BASE_URL]);

    return (
        <>
            <div className='bg-white'>
                <Navbar className="mx-auto py-2 px-16 shadow-none rounded-none">
                    <div className='hidden lg:flex items-center justify-end'>
                        <ul className='flex items-center gap-10'>

                            {/* 🔔 Notification Icon */}
                            <li
                                className="relative text-secondary text-3xl cursor-pointer"
                                onClick={() => navigate("/adminHome/orderlist")}
                            >
                                <IoNotificationsOutline />

                                {newOrders > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                                        {newOrders}
                                    </span>
                                )}
                            </li>

                            <li><Profile /></li>
                        </ul>
                    </div>
                </Navbar>
            </div>
        </>
    );
}
