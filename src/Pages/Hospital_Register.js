import React, { useState } from 'react';
import '../css/Register.css';
import { useNavigate } from 'react-router-dom';
import img from  '../Images/regphoto.png';
import img1 from '../Images/bb_logo(black).png';
import axios from 'axios';
function Hospital_Register() {
    const navigate = useNavigate();

    const [hospital_Name,sethospital_Name] = useState('');
    const [email,setemail] = useState('');
    const [contact_no,setcontact_no] = useState('');
    const [address,setaddress] = useState('');
    const [city,setcity] = useState('');
    const [state,setstate] = useState('');
    const [password,setpassword] = useState('');
    const [a,seta] = useState('');
    const [a_positive,seta_positive] = useState('');
    const [b,setb] = useState('');
    const [b_positive,setb_positive] = useState('');
    const [c,setc] = useState('');
    const [c_positive,setc_positive]= useState('');
    const [ab,setab] = useState('');
    const [aB_positive,setaB_postive] = useState('');
 
    const register = async (e) => {
        e.preventDefault();
        if (!((a=="true"||a=="false") && (a_positive=="true"||a_positive=="false") && (b=="true"||b=="false") && (b_positive=="true"||b_positive=="false") && (c=="true"||c=="false") && (c_positive=="true"||c_positive=="false") && (ab=="true"||ab=="false") && (aB_positive=="true"||aB_positive=="false")) ){
            alert("Blood Groups Field Can Only Take true or false");
            return;
        } 
        if(!hospital_Name || !email || !contact_no || !address || !city || !state || !password)
        {
            alert("Please Provide All Necessary Deatails")
            return;
        }
        axios.post(`${process.env.REACT_APP_API_URL}/api/HAuth/Register`, {
            "hospital_Name": hospital_Name,
            "email": email,
            "contat_no": contact_no,
            "address": address,
            "city": city,
            "state": state,
            "password": password,
            "a": (a === "true"),
            "a_positve": (a_positive === "true"),
            "b": (b==="true"),
            "b_positve": (b_positive==="true"),
            "c": (c==="true"),
            "c_positve": (c_positive==="true"),
            "ab": (ab==="true"),
            "aB_positve": (aB_positive==="true")
        },{
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
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
            alert(err);
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
                    <input type="text" placeholder="Hospital Name" value={hospital_Name} onChange={(e) => sethospital_Name(e.target.value)}/>
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
                    
                    <input type="text" placeholder="Is Blood A Available?Only Accept true or false" value={a} onChange={(e) => seta(e.target.value)}/>
                    <br/>
                    <input type="text" placeholder="Is Blood A+ Available?Only Accept true or false" value={a_positive} onChange={(e) => seta_positive(e.target.value)}/>
                    <input type="text" placeholder="Is Blood B Available?Only Accept true or false" value={b} onChange={(e) => setb(e.target.value)}/>
                    <br/>
                    <input type="text" placeholder="Is Blood B+ Available?Only Accept true or false" value={b_positive} onChange={(e) => setb_positive(e.target.value)}/>                   
                    <input type="text" placeholder="Is Blood C Available?Only Accept true or false" value={c} onChange={(e) => setc(e.target.value)}/>            
                    <br/>
                    <input type="text" placeholder="Is Blood C+ Available?Only Accept true or false" value={c_positive} onChange={(e) => setc_positive(e.target.value)}/>                   
                    <input type="text" placeholder="Is Blood AB Available?Only Accept true or false" value={ab} onChange={(e) => setab(e.target.value)}/>  
                    <input type="text" placeholder="Is Blood AB+ Available?Only Accept true or false" value={aB_positive} onChange={(e) => setaB_postive(e.target.value)}/> 
                    <div class="action-btn">
                        <button class="btn primary" onClick={register}>Create Account</button>
                        <button class="btn" onClick={(e)=>navigate('/register')}>Register As User?</button>
                        <button class="btn" onClick={(e)=>navigate('/login')}>Already Register?</button>
                    </div>
                </form> 
            </div> 
        </div>  
        </body>

    )
}


export default Hospital_Register;