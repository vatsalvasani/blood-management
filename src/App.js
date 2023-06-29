import React from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import './App.css';
import Donate from './Pages/donate';
import Register from './Pages/Register';
import Help from './Pages/Help';
import Home from './Pages/home';
import Login from './Pages/Login';
import Hospital_Register from './Pages/Hospital_Register';
import Home1 from './Pages/Hospital_Home';
import Review from './Pages/review';
import UserProfile1 from './Pages/UserProfile1';
import Hospital_profile from './Pages/Hospital_Profile';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/home1" element={<Home1/>} />
        <Route path="/help" element={<Help />} />
        <Route path="/userprofile1" element={<UserProfile1/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/review" element={<Review />} />
        <Route path="/hregister" element={<Hospital_Register />} />
        <Route path="/hprofile" element={<Hospital_profile />} />
        <Route path="/donate" element={<Donate />} />    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
