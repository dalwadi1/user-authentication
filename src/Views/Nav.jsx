import React from 'react'
import ReactFontLoader from 'react-font-loader'
import { Link } from 'react-router-dom'
import { MdHome } from "react-icons/md";

const Nav = () => {
    return (
        <>
            <ReactFontLoader url='https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap' />

            <nav className='container mx-auto sticky top-5 flex justify-center'>
                <h1 className='text-lg text-white lg:text-xl md:text-sm xs:text-xs' style={{ fontFamily: 'Merriweather' }}>Authentication <span className='text-orange-500 '>system</span></h1>
                <div className='text-white flex justify-center items-center grow'>
                    <h1 className='text-lg items-center hidden'>Rutvik</h1>
                </div>
                <Link to='/' className='text-white no-underline lg:text-xl md:text-sm xs:text-sm' style={{ fontFamily: 'Merriweather' }}><MdHome /></Link>
            </nav>
        </>
    )
}

export default Nav
