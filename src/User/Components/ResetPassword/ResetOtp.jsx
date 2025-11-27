import React, { useContext } from "react";
import { Input, Typography, Button, Card } from "@material-tailwind/react";
import Countdown from 'react-countdown';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../../../StoreContext/StoreContext";

export function ResetOtp() {
    const inputRefs = React.useRef([]);
    const [otp, setOtp] = React.useState(Array(6).fill(""));
    const { BASE_URL } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();

    const { email } = location.state || {};

    const handleChange = (index, value) => {
        const newOtp = [...otp];
        const digits = value.replace(/[^0-9]/g, "");

        if (digits.length === 6) {
            setOtp(digits.split(""));
            digits.split("").forEach((digit, i) => {
                if (inputRefs.current[i]) {
                    inputRefs.current[i].value = digit;
                }
            });
        } else {
            newOtp[index] = digits.charAt(0) || "";
            setOtp(newOtp);

            if (digits && index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handlePaste = (event) => {
        event.preventDefault();
        const pastedText = event.clipboardData.getData("text").trim();
        const digits = pastedText.replace(/[^0-9]/g, "").slice(0, 6);

        if (digits.length === 6) {
            setOtp(digits.split(""));
            digits.split("").forEach((digit, i) => {
                if (inputRefs.current[i]) {
                    inputRefs.current[i].value = digit;
                }
            });
        }
    };

    function handleBackspace(event, index) {
        if (event.key === "Backspace" && !event.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    const verifyOtp = async () => {
        const otpValue = otp.join("");

        if (otpValue.length !== 6) {
            toast.error("Please enter the complete OTP.");
            return;
        }

        try {
            const otpPayload = {
                email: email.trim().toLowerCase(),
                otp: otpValue
            };

            const response = await axios.post(
                `${BASE_URL}/user/auth/forgot-password/verify-otp`,
                otpPayload,
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            if (response.data.tempToken && response.status === 200) {
                localStorage.setItem("newToken", response.data.tempToken);
                toast.success("OTP verified successfully.");
                navigate("/new-password");
            }
        } catch (error) {
            toast.error("Invalid OTP or something went wrong. Please try again.");
        }
    };

    return (
        <div className="lg:flex lg:justify-center lg:items-center min-h-screen px-4 py-20 lg:py-0">
            <Card color="transparent" shadow={false} className="flex items-center">
                <Typography variant="h4" className="text-black font-custom text-4xl text-center">
                    Verification
                </Typography>

                <Typography color="gray" className="mt-3 text-center font-custom text-sm">
                    We have sent a verification code to <span className="font-bold">{email}</span>
                </Typography>

                <div className="w-full max-w-sm mt-10 flex flex-col">
                    <div className="my-4 flex items-center justify-center gap-2">
                        {otp.map((digit, index) => (
                            <Input
                                key={index}
                                maxLength={1}
                                className="!w-10 text-center text-lg"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                containerProps={{
                                    className: "!min-w-0 !w-10",
                                }}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleBackspace(e, index)}
                                onPaste={handlePaste}
                                inputRef={(el) => (inputRefs.current[index] = el)}
                            />
                        ))}
                    </div>

                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="text-center font-custom"
                    >
                        Check your email for the OTP
                    </Typography>

                    <Button
                        onClick={verifyOtp}
                        className="mt-8 bg-black text-sm capitalize font-custom w-full"
                    >
                        Confirm
                    </Button>
                </div>
            </Card>
        </div>
    );
}
