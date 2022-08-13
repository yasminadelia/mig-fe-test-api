import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav 
        className="sticky top-0 bg-blue-800 px-5 md:px-10 lg:px-20 py-3 
        z-10 flex flex-row items-center shadow-lg rounded-b-lg"
    >       
            <Link 
              to="/" 
              className="font-bold text-xl text-white hover:text-black"
            >
              Home
            </Link>

    </nav>
  )
}

export default Navbar