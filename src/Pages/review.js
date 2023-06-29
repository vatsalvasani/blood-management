import React, { useState } from 'react';
import '../css/Review.css';
import img from  '../Images/bb_logo(black).png';
import axios from 'axios';
import Header from '../component/header';
function Review() {
    const [review,setreview] = useState('');

    const addreview =  async(e) => {
        e.preventDefault();

        if (!review){
            alert("Provide Valid Blood Type And City");
            return;
        } 
            
        await axios.get(`${process.env.REACT_APP_API_URL}/email/`+sessionStorage.getItem('email'),{
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
        }).then((res) => {
          if(res.status!=400)
          {
            const ID1 = res.data;
            sessionStorage.setItem('id',ID1);
            reviewPost(ID1);
          }
          
        }).catch((err) => {
            alert("Some Internal Error Try Again");
        });        
        
        }
        const reviewPost = (ID1)=>{
        console.log(ID1)
        axios.post(`${process.env.REACT_APP_API_URL}/api/Review1/review/`+ID1+'/'+review,{},{
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
        })
        .then((res) => {
              if(res.status!=400)
              {
                alert("Thank You For Valuable Time!!!!");
                console.log(res);
              }
              
            }).catch((err) => {
                alert("Some Internal Error Try Again");
            });
        }

    return(
<body>
    <Header></Header>

    <main>
                <div class="container">
                    <div class="contact-box">
                        <div class="left2"></div>
                        <div class="right">
                            <h2>Add Review</h2>
                            <textarea id="w3review" name="w3review" rows="4" cols="50" value={review} onChange={(e) => setreview(e.target.value)}></textarea>
                            <button class="btn1" onClick={addreview}>ADD</button>
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


export default Review;