import React from 'react';
import PartnerNavbar from "../components/PartnerNavbar"
import PartnerSidnav from "../components/PartnerSidenav"




const UserForm = (props) => {



  return (
    
    <form onSubmit={props.getUser}>
 
 <PartnerNavbar/>
 <PartnerSidnav/>
       
        <h1 style={{ color: 'green' }}>
          Create a Task
        </h1>
        <input style={{ margin:"50px auto", display:"block" }} type="text" name="name" placeholder="name"/>
        <input style={{ margin:"50px auto", display:"block" }} type="text" name="description" placeholder="description"/>
        <input style={{ margin:"50px auto", display:"block" }} type="text" name="wantsConsultant" placeholder="wantsConsultant"/>
        <input style={{ margin:"50px auto", display:"block" }} type="text" name="field" placeholder="field"/>


        <button className="btn btn-success btn-sm m-2">Submit</button>
        <div class="alert alert-secondary" role="alert" style={{ position:"fixed",bottom:0,left:0,right:0}}>
        Copyright © 2019 Lirten Inc. All Rights Reserved.
          </div>
 
         </form>
  
  );
  /*
 
        <Link to={`./App/pages/Success`}>
          <Button variant="primary" size="lg" color="blue" active>
            Submit 
          </Button>
        </Link> 

  */

}




export default UserForm;