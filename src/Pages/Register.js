import React, { useState } from 'react';
import '../css/Register.css';
import { useNavigate } from 'react-router-dom';
import img from  '../Images/regphoto.png';
import img1 from '../Images/bb_logo(black).png';
import axios from 'axios';
function Hospital_Register() {
    const navigate = useNavigate();

    const [user_Name,setuser_Name] = useState('');
    const [email,setemail] = useState('');
    const [contact_no,setcontact_no] = useState('');
    const [address,setaddress] = useState('');
    const [city,setcity] = useState('');
    const [state,setstate] = useState('');
    const [password,setpassword] = useState('');
    const [blood_type,setblood_type] = useState('');
 
    const register = async (e) => {
        e.preventDefault();
        if (!(blood_type == "A" || blood_type == "A+" ||blood_type == "B" ||blood_type == "B+" ||blood_type == "C" ||blood_type == "C+" ||blood_type == "AB" ||blood_type == "AB+")){
            alert(" A, A+, B, B+, C, C+, AB, AB+ Are The Only Valid Blood Groups");
            return;
        } 
        if(!user_Name || !email || !contact_no || !address || !city || !state || !password)
        {
            alert("Please Provide All Necessary Deatails")
            return;
        }
        axios.post(`${process.env.REACT_APP_API_URL}/api/Auth/Register`, {
            "user_Name": user_Name,
            "email": email,
            "contact_no": contact_no,
            "address": address,
            "city": city,
            "state": state,
            "password": password,
            "blood_type" : blood_type
        },{
        headers:{
          "Access-Control-Allow-Origin":"*"
    
        }
        }).then((res) => {
          if(res.status!=400 && res.status!=500)
          {
            navigate("/login")
            alert(res.data);
          }
          else if(res.status=400)
          {
            alert("User Already Exist With This Email Id");
          }
          else{
            alert("Server Error Try Again");
          }
          
        }).catch((err) => {
            alert("User Already Exist With This Email Id");
        });
        }

    return(
    <body>        
        <div id="logo"> <img src={img1}/>
                </div>
           <div class="inner">
             <div class="user-form">
                <h1>Start Saving Lives</h1>
                 <form>
                    <input type="text" placeholder="Your Name" value={user_Name} onChange={(e) => setuser_Name(e.target.value)}/>
                    <br/>
                    <input pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$" type="email" placeholder="E-mail" value={email} onChange={(e) => setemail(e.target.value)}/>
                    <br/>

                    <input placeholder="Mobile No."  type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value={contact_no} onChange={(e) => setcontact_no(e.target.value)}  />

                    <input type="textArea" placeholder="Address" rows="2" value={address} onChange={(e) => setaddress(e.target.value)}/>
                    <br/>
                    <input type="text" placeholder="City" value={city} onChange={(e) => setcity(e.target.value)}/>
                    <br/>
                    <input type="text" placeholder="State" value={state} onChange={(e) => setstate(e.target.value)}/>
                    <br/>
                    <input type="password" placeholder="Password" id="password_data" value={password} onChange={(e) => setpassword(e.target.value)} />
                    
                    <input type="text" placeholder="Enter Your Blood Group" value={blood_type} onChange={(e) => setblood_type(e.target.value)}/>

                    <div class="action-btn">
                        <button class="btn primary" onClick={register}>Create Account</button>
                        <button class="btn" onClick={(e)=>navigate('/hregister')}>Register As Hospital?</button>
                        <button class="btn" onClick={(e)=>navigate('/login')}>Already Register?</button>
                    </div>
                </form> 
            </div> 
        </div>  
        </body>

    )
}


export default Hospital_Register;