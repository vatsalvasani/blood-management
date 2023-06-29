import React, { useState } from 'react';
import axios from 'axios';
import Header from '../component/header';
import Example1 from '../component/review_t';
import Example3 from '../component/donate_t';
import Example4 from '../component/benefit_t';
import Example from '../component/user_t';
function UserProfile1() {

    return(
<body>
    <Header></Header><br/><br/><br/><br/>
    <Example></Example><br></br><br></br>
    <Example1></Example1><br></br><br></br>
    <Example4></Example4><br></br><br></br>
    <Example3></Example3><br></br>
</body>
    )
}


export default UserProfile1;