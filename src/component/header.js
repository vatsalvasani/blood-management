

import React from 'react';
import '../css/header.css';
import { Link, NavLink } from "react-router-dom";
import img from  '../Images/bb_logo(black).png';
function Header() {

    return(
        <header>
        <nav>
            <div class="header-logo"><img src={img}/></div>
            <div class="header-list">
                <ul>
                    <li><NavLink to="/userprofile1">My Profile</NavLink></li>
                    <li><NavLink to="/review">Add Review</NavLink></li>
                    <li><NavLink to="/help">Get Help</NavLink></li>
                    <li><NavLink to="/donate">Donate</NavLink></li>
                    <li><NavLink to="/home">Home</NavLink></li>
                </ul>
            </div>
        </nav>
    </header>
    )
}


export default Header;