import React from 'react'
import ReactFontLoader from 'react-font-loader'
import { Link } from 'react-router-dom'
import Nav from '../Nav'

const SignIn = () => {
    return (
        <>
            <ReactFontLoader url='https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap' />

            <div className='h-screen w-full bg-black'>
                <Nav />
                <div className='md:-mt-10 xs:-mt-2 container mx-auto h-screen flex justify-center items-center'>
                    <form className='w-96'>
                        <h1 className="mb-5 lg:text-xl md:text-sm xs:text-xs text-center text-orange-500" style={{ fontFamily: 'Merriweather' }}>Please signin</h1>


                        <div className="form-floating mt-3">
                            <input type="email" className="form-control  md:text-sm xs:text-xs" placeholder="Password" />
                            <label >user Email</label>
                        </div>
                        <div className="form-floating mt-3">
                            <input type="password" className="form-control  md:text-sm xs:text-xs" id="floatingPassword" placeholder="Password" />
                            <label>Password</label>
                        </div>


                        <div className='md:flex justify-between items-center mt-5'>
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
