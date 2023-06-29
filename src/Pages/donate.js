import React, { useState } from 'react';
import '../css/donate.css';
import img from  '../Images/bb_logo(black).png';
import axios from 'axios';
import Header from '../component/header';
function  Donate() {
    const [blood_type,setBlood_type] = useState('');
    const [city,setcity] = useState('');

    const sendsuggestion =  async(e) => {
        e.preventDefault();
        if (!(blood_type == "A" || blood_type == "A+" ||blood_type == "B" ||blood_type == "B+" ||blood_type == "C" ||blood_type == "C+" ||blood_type == "AB" ||blood_type == "AB+")){
            alert(" A, A+, B, B+, C, C+, AB, AB+ Are The Only Valid Blood Groups");
            return;
        } 
        if (!blood_type || !city){
            alert("Provide Valid Blood Type And City");
            return;
        } 
        await axios.get(`${process.env.REACT_APP_API_URL}/api/Donors/hospital/`+city+'/'+blood_type,{
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
      })
        .then((res) => {
          if(res.status!=400)
          {
            var hospital = res.data;
            console.log(hospital);
            sendmail(hospital[0].hospitalId);
          }
          
        }).catch((err) => {
            alert("Some Internal Error Try Again");
        });
        }

   const sendmail = async(id) => {
            
        await axios.get(`${process.env.REACT_APP_API_URL}/email/`+sessionStorage.getItem('email'),{
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
      }).then((res) => {
          if(res.status!=400)
          {
            var ID1 = res.data;
            postDonor(ID1,id);
          }
          
        }).catch((err) => {
            alert("Some Internal Error Try Again");
        });
            }
        const postDonor = (ID1,id)=>{
            axios.post(`${process.env.REACT_APP_API_URL}/api/Donors/`+ID1+'/'+id,{},{
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              }})
           .then((res) => {
           if(res.status!=400)
           {
             console.log(res);
             sendmail1(id)
            }
              
            }).catch((err) => {
                alert("Some Internal Error Try Again");
            });
            }
            const sendmail1 = (id)=>{
            axios.post(`${process.env.REACT_APP_API_URL}/api/Donors/mail/`+sessionStorage.getItem('email')+'/'+id,{},{
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              }})
            .then((res) => {
              if(res.status!=400 && res.status!=500)
              {
                alert(res.data)
              }
              
            }).catch((err) => {
                alert(err);
            });
            }

    return(
<body>
    <Header></Header>

    <main>
                <div class="container">
                    <div class="contact-box">
                        <div class="left"></div>
                        <div class="right">
                            <h2>Search For Nearby Hospital</h2>
                            <input type="text" class="field" placeholder="Your Blood Group" value={blood_type} onChange={(e) => setBlood_type(e.target.value)}/>
                            <input type="text" class="field" placeholder="Your City" value={city} onChange={(e) => setcity(e.target.value)}/>
                            <button class="btn1" onClick={sendsuggestion}>Send Suggestion</button>
                        </div>
                    </div>
                </div>
    </main>



    <footer>
        <div class="siteFooterBar">
            <div class="content1">
                <div class="foot">2021 © All rights reserved.</div>
            </div>
        </div>
        <div class="footer-content">
            <h3>JOIN OUR CAUSE</h3>
            <p>Donating blood or platelets can be intimidating and even scary. Time to put those hesitations and fears aside. Learn from Blood Buddy and platelet donors how simple and easy it is to roll up a sleeve and help save lives.</p>
            <div class="socials">
                <ul class="sci">
                    <li><a href="https://www.facebook.com/givebloodnhs/" target="_blank"><i
                                class="fab fa-facebook"></i></a></li>
                    <li><a href="https://www.instagram.com/indiablooddonation/?hl=en" target="_blank"><i
                                class="fab fa-instagram"></i></a></li>
                    <li><a href="http://nbtc.naco.gov.in/" target="_blank"><i class="fas fa-globe"></i></a></li>
                </ul>
            </div>
        </div>


    </footer>
    


</body>
    )
}


export default Donate;