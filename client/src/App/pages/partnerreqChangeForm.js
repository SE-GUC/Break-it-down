import React from 'react';
import Logo2 from "../../../src/Logo2.png"
import PartnerNavbar from "../components/PartnerNavbar"
import PartnerSidnav from "../components/PartnerSidenav"

const UpdateForm = (props) => {



    return (
      
      <form onSubmit={props.getz}>
     <PartnerNavbar/>
     <PartnerSidnav/>
         
          <h1 style={{ color: 'green' }}>
            Update your task
          </h1>
          <input style={{ margin:"50px auto", display:"block" }} type="text" name="description" placeholder="description"/>
          
          <button className="btn btn-success btn-sm m-2">Submit</button>
         
          <div class="alert alert-secondary" role="alert" style={{ position:"fixed",bottom:0,left:0,right:0}}>
          Copyright © 2019 Lirten Inc. All Rights Reserved.
            </div>
   
           </form>
    
    );

  
  }
  
  
  
  
  export default UpdateForm;