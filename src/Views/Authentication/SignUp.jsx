import React, { useState } from 'react'
import Nav from '../Nav'
import ReactFontLoader from 'react-font-loader'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setformData] = useState({
        username: '',
        email: '',
        password: '',
        conformpassword: '',
    })

    const handleData = (e) => {
        const { name, value } = e.target;
        setformData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const submitData = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://localhost:5000/sign-up', formData)
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
                navigate('/sign-up')
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
                <div className='xs:-mt-2 md:-mt-10 container mx-auto h-screen flex justify-center items-center'>
                    <form className='w-96' onSubmit={submitData}>
                        <h1 className="mb-5 lg:text-xl md:text-sm xs:text-xs text-center text-orange-500" style={{ fontFamily: 'Merriweather' }}>Please sign up</h1>

                        <div className="form-floating ">
                            <input type="text" className="form-control" name='username' id="floatingInput" onChange={handleData} placeholder="name@example.com" />
                            <label >User Name</label>
                        </div>
                        <div className="form-floating mt-3">
                            <input type="email" className="form-control" name='email' onChange={handleData} placeholder="Password" />
                            <label >user Email</label>
                        </div>
                        <div className="form-floating mt-3">
                            <input type="password" className="form-control" name='password' id="floatingPassword" onChange={handleData} placeholder="Password" />
                            <label >Password</label>
                        </div>
                        <div className="form-floating mt-3 mb-5">
                            <input type="password" className="form-control" name='conformpassword' onChange={handleData} placeholder="Password" />
                            <label >Conform Password</label>
                        </div>
                        <div className='md:flex justify-between items-center mt-5'>
                            <button className='bg-orange-500 text-white rounded-full px-3 p-2  md:text-sm xs:text-xs'>Sign up</button>
                            <h1 className='text-white text-sm mt-2 p-2  md:text-sm xs:text-xs'>don't have an Account? <Link to='/sign-in'>Sign in</Link></h1>
                        </div>
                        {/* <div className='md:flex justify-between items-center'>
                            <button className='bg-orange-500 text-white rounded-full px-3 p-2 lg:text-xl md:text-sm xs:text-xs'>Sign up</button>
                            <h1 className='text-white lg:text-xl md:text-sm xs:text-xs mt-2 p-2'>All ready have Account? <Link to='/sign-in'>Sign in</Link></h1>
                        </div> */}

                    </form>
                </div>
            </div >
        </>
    )
}

export default SignUp
