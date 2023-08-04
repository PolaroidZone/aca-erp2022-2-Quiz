import React from 'react'
import '../styles/Nav.css'

const NavBar =  () => {
  return (
    <nav>
        <div className="logo">
            <img src="" alt="" />
        </div>
        <div className="nav-links">
            <ul>
                <li><a href="">HOME</a></li>
                <li><a href="">SYNOPSIS</a></li>
                <li><a href="">CAST</a></li>
                <li><a href="">GALLERY</a></li>
                <li><a href="">TRAILER</a></li>
            </ul>
        </div>
        <div className="ham-burger">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
    </nav>
  )
}


export default NavBar
