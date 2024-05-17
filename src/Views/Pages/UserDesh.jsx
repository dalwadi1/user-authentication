
import React, { useEffect, useState } from "react";
import ReactFontLoader from "react-font-loader";
import { Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav";


const UserDesh = () => {
    const userToken = localStorage.getItem('token');
    const [userdata, userData] = useState({})
    const navigate = useNavigate();

    const checkUserToken = () => {
        if (!userToken || userToken === 'undefined') {
            return navigate('/sign-in');
        }
    }
    useEffect(() => {
        checkUserToken();
        sendToken();
        userData({
            userName: localStorage.getItem("userName"),
            userEmail: localStorage.getItem("userEmail"),
            userId: localStorage.getItem("userId")
        })
    }, []);

    const logout = () => {
        localStorage.clear()
        navigate('/sign-in')
    }
    const sendToken = async () => {
        const res = await axios.get('http://localhost:5000/profile', {
            headers: {
                "Authorization": userToken
            }
        })
        const data = res.data.userProfile
        if (data) {
            localStorage.setItem("userName", data.userName)
            localStorage.setItem("userEmail", data.userEmail)
            localStorage.setItem("userId", data._id)
        }
    }

    return (
        <>

            <ReactFontLoader url='https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap' />

            <div className='h-screen w-full bg-black'>
                <Nav />
                <div className="flex justify-center items-center h-screen -mt-7">
                    <div>
                        <h1 className="text-white">{userdata.userName}</h1>
                        <h1 className="text-white">{userdata.userEmail}</h1>
                        <h1 className="text-white">{userdata.userId}</h1>
                    </div>
                </div>
            </div>
        </>
    );
}
export default UserDesh;