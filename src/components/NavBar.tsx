import React from 'react'
import '../styles/Nav.css'
import imageLogo from '../images/Av-Logo.png'

const NavBar =  () => {
  return (
    <nav>
        <div className="logo">
            <h1>A</h1>
        </div>
        <ul className="nav-links">
            <li><a href="">HOME</a></li>
            <li><a href="">SYNOPSIS</a></li>
            <li><a href="">CAST</a></li>
            <li><a href="">GALLERY</a></li>
            <li><a href="">TRAILER</a></li>
        </ul>
        <div className="ham-burger">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
    </nav>
  )
}


export default NavBar
