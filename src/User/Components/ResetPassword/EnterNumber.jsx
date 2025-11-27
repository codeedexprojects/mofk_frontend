import { Button } from '@material-tailwind/react'
import React, { useContext, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../../StoreContext/StoreContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const EnterNumber = () => {
    const { BASE_URL } = useContext(AppContext)
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSendOtp = async () => {
        try {
            const payload = { email: email.trim().toLowerCase() };

            const response = await axios.post(
                `${BASE_URL}/user/auth/forgot-password/send-otp`,
                payload
            );

            navigate('/reset-otp', { state: { email } });
        } catch (error) {
            if (error.response?.data?.message === "User with this email does not exist") {
                toast.error("User not found. Please sign up.");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className='flex justify-center items-center h-[100vh] px-4 py-20 lg:py-0'>
            <div className='flex flex-col justify-center items-center space-y-2'>
                <div className='w-20 h-20 bg-black/10 p-4 rounded-full'>
                    <img src="key.png" alt="" className='w-full h-full' />
                </div>

                <h1 className='capitalize text-3xl font-semibold'>Forgot password?</h1>
                <p className='text-sm text-gray-700'>
                    Enter your registered email to receive a code and reset your password.
                </p>

                <div className='!mt-10 space-y-4 flex flex-col w-full'>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
                        className="w-full border border-gray-500 bg-white py-2 rounded-lg px-5 placeholder:text-blue-gray-300"
                    />
                    <Button onClick={handleSendOtp} className='bg-black font-custom capitalize font-normal text-sm'>
                        Reset password
                    </Button>
                </div>

                <Link to='/login-user' className='flex items-center !mt-10'>
                    <IoIosArrowBack />
                    Back to log in
                </Link>
            </div>
        </div>
    )
}

export default EnterNumber;
