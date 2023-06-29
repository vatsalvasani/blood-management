

import React from 'react';
import '../css/header.css';
import { Link, NavLink } from "react-router-dom";
import img from  '../Images/bb_logo(black).png';
function Header3() {

    return(
        <header>
        <nav>
            <div class="header-logo"><img src={img}/></div>
            <div class="header-list">
                <ul>
                    <li><NavLink to="/hprofile">My Profile</NavLink></li>
                    <li><NavLink to="/home1">Home</NavLink></li>
                </ul>
            </div>
        </nav>
    </header>
    )
}


export default Header3;