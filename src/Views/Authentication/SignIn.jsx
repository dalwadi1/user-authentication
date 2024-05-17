import React, { useState } from 'react'
import ReactFontLoader from 'react-font-loader'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../Nav'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'

const SignIn = () => {
    const navigate = useNavigate()
    const [formdata, setformData] = useState({
        email: '',
        password: ''
    })

    const uaerData = (e) => {
        const { name, value } = e.target;
        setformData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    const submitdata = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://localhost:5000/sign-in', formdata)
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
                if (res.data.token) {
                    localStorage.clear();
                    localStorage.setItem("token", res.data.token)
                    navigate('/user-desh')
                } else {
                    navigate('/sign-in')
                }
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
                        <h1 className="mb-5 lg:text-xl md:text-sm xs:text-xs text-center text-orange-500" style={{ fontFamily: 'Merriweather' }}>Please signin</h1>


                        <div className="form-floating mt-3">
                            <input type="email" name='email' onChange={uaerData} className="form-control  md:text-sm xs:text-xs" placeholder="Password" />
                            <label >user Email</label>
                        </div>
                        <div className="form-floating mt-3">
                            <input type="password" name='password' onChange={uaerData} className="form-control  md:text-sm xs:text-xs" id="floatingPassword" placeholder="Password" />
                            <label>Password</label>
                        </div>
                        <h1 className='text-white text-sm mt-5 p-2 text-right  md:text-sm xs:text-xs'><Link to='/send-mail'>Forgget password?</Link></h1>


                        <div className='md:flex justify-between items-center mt-2'>
                            <button className='bg-orange-500 text-white rounded-full px-3 p-2  md:text-sm xs:text-xs'>Sign In</button>
                            <h1 className='text-white text-sm mt-2 p-2  md:text-sm xs:text-xs'>don't have an Account? <Link to='/sign-up'>Sign Up</Link></h1>
                        </div>

                    </form>
                </div>
            </div >
        </>
    )
}

export default SignIn
