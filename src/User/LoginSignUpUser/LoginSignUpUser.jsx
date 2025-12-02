import {
    Button,
    Card,
    Input,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../StoreContext/StoreContext";

export function LoginSignUpUser() {
    const { BASE_URL } = useContext(AppContext);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        phone: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate required fields
        if (!loginData.phone?.trim()) {
            toast.error("Phone number is required");
            setIsSubmitting(false);
            return;
        }

        if (!loginData.password?.trim()) {
            toast.error("Password is required");
            setIsSubmitting(false);
            return;
        }

        // Validate phone number
        if (!/^\d{10,15}$/.test(loginData.phone)) {
            toast.error("Please enter a valid phone number (10–15 digits)");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/user/auth/login`,
                {
                    phone: loginData.phone,
                    password: loginData.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.token) {
                localStorage.setItem("userToken", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                navigate("/");
                toast.success("Login Success");
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.msg ||
                error.response?.data?.error ||
                "Login failed. Please check your credentials.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white px-4 py-8 overflow-auto">
            <Card
                color="transparent"
                shadow={false}
                className="w-full max-w-md"
            >
                <Typography
                    variant="h4"
                    className="text-black font-custom text-center text-3xl mb-2"
                >
                    Login here
                </Typography>
                <Typography
                    color="gray"
                    className="mb-6 font-semibold font-custom text-secondary text-center text-lg"
                >
                    Welcome! Let's find your perfect style!
                </Typography>

                <form className="mb-2 w-full" onSubmit={handleLoginSubmit}>
                    <div className="mb-4 flex flex-col gap-4">
                        <div className="flex items-center border-[1px] rounded-lg !border-gray-300 bg-white">
                            <span className="py-3 px-4 text-secondary cursor-default">
                                +91
                            </span>
                            <Input
                                name="phone"
                                type="tel"
                                value={loginData.phone}
                                onChange={handleInputChange}
                                placeholder="Phone Number"
                                maxLength={15}
                                className="px-0 border-none placeholder:text-blue-gray-300 !font-custom placeholder:font-custom placeholder:opacity-100 focus:border-gray-300 focus:border-[1px]"
                                labelProps={{
                                    className:
                                        "before:content-none after:content-none",
                                }}
                            />
                        </div>

                        <div className="flex items-center border-[1px] rounded-lg pr-3 !border-gray-300 bg-white">
                            <Input
                                type={passwordVisible ? "text" : "password"}
                                value={loginData.password}
                                onChange={handleInputChange}
                                name="password"
                                size="lg"
                                placeholder="Password"
                                className="border-none placeholder:text-blue-gray-300 !font-custom placeholder:font-custom placeholder:opacity-100 focus:border-gray-300 focus:border-[1px]"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="cursor-pointer text-gray-500 focus:outline-none"
                            >
                                {passwordVisible ? (
                                    <FaRegEye className="text-xl" />
                                ) : (
                                    <FaRegEyeSlash className="text-xl" />
                                )}
                            </button>
                        </div>

                        <Link to="/forget-password" className="self-end">
                            <Typography className="font-custom text-sm text-black font-medium">
                                Forgot Password?
                            </Typography>
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 bg-black font-custom text-sm font-normal capitalize hover:bg-secondary"
                        fullWidth
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : "Sign in"}
                    </Button>

                    <Typography
                        color="gray"
                        className="mt-4 text-center text-secondary text-sm font-normal font-custom"
                    >
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-medium text-black">
                            Sign Up
                        </Link>
                    </Typography>

                    <div className="flex flex-col items-center justify-center gap-4 mt-6">
                        <div className="flex items-center w-full">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="px-3 text-gray-500 font-medium text-sm">
                                or continue with
                            </span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <button
                            onClick={() =>
                                window.open(
                                    `${BASE_URL}/user/auth/google`,
                                    "_self"
                                )
                            }
                            className="flex items-center justify-center gap-2 border border-gray-300 bg-white w-full text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <img
                                src="/google.png"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            <span className="text-sm">Google</span>
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
}