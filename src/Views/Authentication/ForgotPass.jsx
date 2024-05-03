import React, { useState } from 'react'
import ReactFontLoader from 'react-font-loader'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Nav from '../Nav'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'

const ForgotPass = () => {
    const param = useParams()
    const token = param.token;
    const navigate = useNavigate()
    const [formdata, setformData] = useState({
        pass: '',
        cpass: ''
    })

    const uaerData = (e) => {
        const { name, value } = e.target;

        setformData((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    const submitdata = async (e) => {

        e.preventDefault();

        const data = {
            formdata: formdata,
            token: token
        }
        const res = await axios.put('http://localhost:5000/forgot-pass', data)
        if (res.data.success === true) {
            toast.success(res.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            if (res.data.success === true) {
                navigate('/sign-in')
            }
            else {
                navigate('/sign-in')
            }
        } else {
            toast.error(res.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }



    }
    return (
        <>
            <ReactFontLoader url='https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap' />

            <div className='h-screen w-full bg-black'>
                <Nav />
                <div className='md:-mt-10 xs:-mt-2 container mx-auto h-screen flex justify-center items-center'>
                    <form className='w-96' onSubmit={submitdata}>
                        <h1 className="mb-5 lg:text-xl md:text-sm xs:text-xs text-center text-orange-500" style={{ fontFamily: 'Merriweather' }}>Reset Your Password </h1>


                        <div className="form-floating mt-3">
                            <input type="hidden" name='pass' value={token} onChange={uaerData} className="form-control  md:text-sm xs:text-xs" placeholder="Password" />
                        </div>

                        <div className="form-floating mt-3">
                            <input type="password" name='pass' onChange={uaerData} className="form-control  md:text-sm xs:text-xs" placeholder="Password" />
                            <label >New Password</label>
                        </div>
                        <div className="form-floating mt-3">
                            <input type="password" name='cpass' onChange={uaerData} className="form-control  md:text-sm xs:text-xs" id="floatingPassword" placeholder="Password" />
                            <label>Conform New Password</label>
                        </div>

                        <div className='md:flex justify-center items-center mt-5'>
                            <button className='bg-orange-500 text-white rounded-full px-3 p-2  md:text-sm xs:text-xs'>Reset Password</button>
                        </div>

                    </form>
                </div>
            </div >

        </>
    )
}

export default ForgotPass
