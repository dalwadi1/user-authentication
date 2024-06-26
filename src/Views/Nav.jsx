import React, { useEffect, useState } from 'react'
import ReactFontLoader from 'react-font-loader'
import { Link, useNavigate } from 'react-router-dom'
import { MdHome } from "react-icons/md";

const Nav = () => {

    const [islogedin, isLogedin] = useState(false);
    const navigate = useNavigate()

    const username = localStorage.getItem("userName")
    useEffect(() => {
        if (!username) {
            isLogedin(false)
        } else {
            isLogedin(true)
        }
    }, [])

    const logout = () => {
        localStorage.clear()
        navigate('/')
    }
    return (
        <>
            <ReactFontLoader url='https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap' />

            <nav className='container mx-auto sticky top-5 flex justify-center'>
                <h1 className='text-lg text-white lg:text-xl md:text-sm xs:text-xs' style={{ fontFamily: 'Merriweather' }}>Authentication <span className='text-orange-500 '>system</span></h1>
                <div className='text-white flex justify-center items-center grow'>
                    <h1 className='text-lg items-center hidden'>Rutvik</h1>
                </div>
                <span className='text-white text-sm'>{islogedin ? <button onClick={logout}>Log out</button> : <Link to='/' className='text-white no-underline lg:text-xl md:text-lg xs:text-lg' style={{ fontFamily: 'Merriweather' }}><MdHome /></Link>}</span>
            </nav>
        </>
    )
}

export default Nav
