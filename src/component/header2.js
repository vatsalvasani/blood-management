

import React from 'react';
import '../css/header1.css';
import vid from '../video/homevideo1.mp4'
import { Link, NavLink, useNavigate } from "react-router-dom";
import img from  '../Images/bb_logo(black).png';
function Header2() {

    const navigate = useNavigate();
    const logout = async() =>{
        sessionStorage.clear();
        navigate('/login')
    };
    return(
        <header className='header1'>
                <video id="homevideo" controls autoPlay loop muted >                    <source src={vid} type="video/mp4"/>
                </video>
                <div id="logo"> <img src={img}/>
                </div>
                <div id="nav">
                    <div class="header-list" id="headerl">
                        <ul>
                        <li><a class="scroll" onClick={logout}>LogOut</a></li>
                        <li><a class="scroll" href="hprofile">My Profile</a></li>
                            <li><a href="home1" >Home</a></li>
                        </ul>
                    </div>
                </div>
                <div class="text-box">
                    <h1> Start </h1>
                    <h1>Saving Lives </h1>
                    <p>Become a donor or request for blood And help save lives</p>
                </div>
            </header>
        
    )
}


export default Header2;