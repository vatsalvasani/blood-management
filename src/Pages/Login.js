import React, { useState } from 'react';
import axios from "axios";
import '../css/Login.css';
import img from  '../Images/regphoto.png';
import img1 from  '../Images/bb_logo(black).png';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();
    const login = async (e) => {
        e.preventDefault();
        if (!password || !email){
            alert("Provide Valid Email And Password");
            return;
        } 
        axios.post(`${process.env.REACT_APP_API_URL}/api/Auth/Login`, {
          Email: email,
          password: password,
        },{
        headers:{
          "Access-Control-Allow-Origin":"*"
    
        }
        }).then((res) => {
          if(res.status!=400)
          {
            sessionStorage.setItem('email',email);
            sessionStorage.setItem('token',res.data);
        //   sessionStorage.getItem('email')
        axios.get(`${process.env.REACT_APP_API_URL}/email/`+sessionStorage.getItem('email'),{
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
      }).then((res1) => {
          if(res1.status!=400)
          {
            sessionStorage.setItem('id',res1.data);
          }
          
        }).catch((err) => {
            alert("Some Internal Error Try Again");
        });
            navigate("/home")
          }
          
        }).catch((err) => {
            alert("Email Or Password Is Incorrect");
        });
        }

            const login_hospital = async (e) => {
                e.preventDefault();
                if (!password || !email){
                    alert("Provide Valid Email And Password");
                    return;
                } 
                await axios.post(`${process.env.REACT_APP_API_URL}/api/HAuth/login`, {
                  Email: email,
                  password: password,
                },{

                }).then((res) => {
                  if(res.status!=400)
          {
            sessionStorage.setItem('email',email);
            sessionStorage.setItem('token',res.data);
        //   sessionStorage.getItem('email')
        axios.get(`${process.env.REACT_APP_API_URL}/hemail/`+sessionStorage.getItem('email'),
        {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
      },)
          .then((res1) => {
          if(res1.status!=400)
          {
            sessionStorage.setItem('id',res1.data);
          }
          
        }).catch((err) => {
            alert("Some Internal Error Try Again");
            return;
        });
            navigate("/home1")
          }
                  
                }).catch((err) => {
                    alert("Email Or Password Is Incorrect");
                });
                }


    return(
    <body>        
        <div id="logo"> <img src={img1}/>
                </div>
           <div class="inner1">
            <div class="photo1">
                <img src={img}/>
            </div>
             <div class="user-form1">
                <h1>Start Saving Lives</h1>
                 <form>
                    <i class="fas fa-envelope-square"></i>
                    <input type="email" placeholder="E-mail"  value={email} onChange={(e) => setemail(e.target.value)}/>
                    <br/>
                    <i class="fas fa-lock"></i>
                    <input type="password" placeholder="Password" id="password_data" value={password} onChange={(e) => setpassword(e.target.value)}/>

                    <div class="action-btn">
                        <button class="btn primary" onClick={login}>Login As User</button>
                        <button class="btn" onClick={login_hospital}>Login As Hospital</button>
                        <button class="btn" onClick={(e)=>navigate('/register')}>Register</button>
                    </div>
                </form> 
            </div> 
        </div>  
        </body>

    )
}


