import React, { useEffect, useState } from 'react';
import '../css/index.css';
import img from  '../Images/bb_logo(white).png';
import loader1 from '../Images/pre-loader.svg';
import Header1 from '../component/header1';
import axios from 'axios';
class Home extends React.Component {

    state ={
        donor2 : [],
        review2 : [],
        hospital : []
      }
      componentDidMount(){
        setTimeout(() => {
            const preloader = document.querySelector(".preloader");
            preloader.remove();
          }, 2000);


          var donor1 = [];
        axios.get(`${process.env.REACT_APP_API_URL}/api/Donors/`,{
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
        })
        .then((res)=>
        {
          const donor = res.data;
          donor.map((donor11)=> {
            axios.get(`${process.env.REACT_APP_API_URL}/api/User/`+donor11.user1Id,{
                headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                  'Content-Type': 'application/json',
                },
            })
        .then((res1)=>
        {
            const a = res1.data;
            donor1.push(a)
            this.setState({donor2 : donor1});
            
          });
        })
        });


        axios.get(`${process.env.REACT_APP_API_URL}/api/Review1/`,{
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
        })
        .then((res)=>
        {
          const review = res.data;
          
           this.setState({review2 : review});            
          });        

          axios.get(`${process.env.REACT_APP_API_URL}/api/Hospitals/`,{
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
        },)
        .then((res)=>
        {
          const hospital1 = res.data;
          
           this.setState({hospital : hospital1});            
          });  
      }
      
    render(){  
    return( 
        <html>
            <div class="preloader">
        <img src={loader1} alt="spinner"/>
    </div>
            <span />
        <body>
            <Header1></Header1>
        
            <main>
                <section id="about-us">
                    <div class="about">
                        <h1 class="heading">What is this all about ?</h1> <br/>
                        <p class="head-des">We solve the problem of blood emergencies by connecting<span
                                class="one-line"><br/></span> blood donors And Needy One directly with Hospital Near Them. </p>
                        <div class="row">
                            <div class="about-col">
                                <h3>What we do ?</h3>
                                <p>We connect blood donors with Hospital, for an
                                    efficient and seamless process.Our goal is to provide an easy ,efficient And fast Service.</p>
                            </div>
                            <div class="about-col">
                                
                                <br/>
                                <h3>Innovative</h3>
                                <p>Blood Buddy is an innovative approach to address global health.We provide <span>immediate
                                        access</span> to blood donors And Needy People.</p>
                            </div>
                            <div class="about-col">
                                
                                <h3>Network</h3>
                                <p>Blood Buddy is one of several community organizations working together as a network that
                                    responds to emergencies in an efficient manner.</p>
                            </div>
                            <div class="about-col">
                                
                                <h3>Get notified</h3>
                                <p>Blood Buddy Connect works with network partners to connect blood donors and Hospitals
                                    through an automated Email service.</p>
                            </div>
                            <div class="about-col">
                                
                                <h3>Totally Free</h3>
                                <p>Blood Budyy's ultimate goal is to provide an easy -to-use, easy-to-access, fast, efficient,
                                    and reliable way to get life-saving blood, totally <span>Free of cost.</span></p>
                            </div>
                            <div class="about-col">
                               
                                <h3>Save Life</h3>
                                <p>We are a non profit foundation and our main objective is to make sure that everything is done
                                    to protect Needy persons.<span>Help
                                        us by making a gift!</span></p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        
        
            <div class="volunteer" section id="vol-sect">
                <div class="title-head">
                    <h1 class="title">Some Of Our Super heroes </h1>
                </div>
                <br></br><br></br>
                <ul class="volunt">
                {this.state.donor2.slice(0,5).map((donor) => (
            <li class="vol">
            <span class=" vol-i number"></span>
            <span class=" vol-i name">{donor.user_Name}</span>
            <span class=" vol-i location">{donor.state}</span>
            <span class=" vol-i blood group">{donor.blood_type}<i class="fa fa-tint" aria-hidden="true"></i>
            </span>
        </li>
          ))}        
          
                </ul>
            </div>
            <section class="customer-review">
                <div class="row-customer">
                    <h2>See what our users have to say</h2>
                </div>
                <div class="row-customer">

                {this.state.review2.slice(0,3).map((review) => (
            <div class="col-customer span-1-of-3-customer customer-box">
            <div class="customer-text-box">
                {review.description}
            </div>

        </div>
          ))}    
                    
                </div>
            </section>

            <div class="volunteer" section id="vol-sect">
                <div class="title-head">
                    <h1 class="title">Hospital Connected With Us </h1>
                </div>
                
                <ul class="volunt">
                {this.state.hospital.slice(0,5).map((h) => (
            <li class="vol">
            <span class=" vol-i number"></span>
            <span class=" vol-i name">{h.hospital_Name}</span>
            <span class=" vol-i location">{h.city}</span>
            <span class=" vol-i blood group">{h.state}<i class="fa fa-tint" aria-hidden="true"></i>
            </span>
        </li>
          ))}  
        
                </ul>
            </div>
        
        
            <footer>
                <div class="siteFooterBar">
                    <div class="content1">
                        <div class="foot">- VATSAL VASANI.</div>
                    </div>
                </div>
                <div class="footer-content">
                    <h3>JOIN OUR CAUSE</h3>
                    <p>Donating blood or platelets can be intimidating and even scary. Time to put those hesitations
                        and
                        fears
                        aside. Learn from Blood Buddy and See how simple and easy it is to roll up a
                        sleeve
                        and help in
                        saving lives.</p>
                </div>
        
        
            </footer>
        
    
        
        </body>
        
        </html>

    )
}}


export default Home;