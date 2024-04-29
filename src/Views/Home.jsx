import React from 'react'
import { Link } from 'react-router-dom'
import ReactFontLoader from 'react-font-loader'
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {
    return (
        <>
            <ReactFontLoader url='https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap' />

            <div className='h-screen w-100 bg-black'>
                <nav className='container mx-auto sticky top-5 flex justify-center'>
                    <h1 className='lg:text-xl md:text-sm xs:text-xs text-white' style={{ fontFamily: 'Merriweather' }}>Authentication <span className='text-orange-500 '>system</span></h1>
                    <div className='text-white flex justify-center items-center grow'>
                    </div>
                    <Link to='/sign-in' className='text-orange-500 lg:text-xl md:text-sm xs:text-xs no-underline hover:text-white' style={{ fontFamily: 'Merriweather' }}>Sign <span className='text-white'>in</span></Link>
                </nav>
                <div className='text-white h-full -mt-9 w-full flex items-center justify-center '>
                    <div className='flex-col text-center'>
                        <h1 className='text-3xl text-orange-500 font-bold text-center lg:text-xl md:text-sm xs:text-xs' style={{ fontFamily: 'Merriweather' }}><span className='text-white'>Wellcome to the</span> Users Authentication And <br />Authorized <span className='text-white'>Syatem!</span></h1>
                        <button className='bg-orange-500 rounded-full p-1 mt-5 lg:text-lg md:text-sm xs:text-xs'><Link to='/sign-in' className='no-underline text-white flex justify-center items-center' style={{ fontFamily: 'Merriweather' }}>Let's start<FaArrowRightLong className='ml-2' /></Link></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
