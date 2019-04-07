import React from 'react';
import {Link} from "react-router-dom";



const UserForm = (props) => {

  return (
    
    <form onSubmit={props.getUser}>
       
        <h1 style={{ color: 'green' }}>
          Create a Task
        </h1>
        <input style={{ margin:"50px auto", display:"block" }} type="text" name="name" placeholder="name"/>
        <input style={{ margin:"50px auto", display:"block" }} type="text" name="description" placeholder="description"/>
        <input style={{ margin:"50px auto", display:"block" }} type="text" name="wantsConsultant" placeholder="wantsConsultant"/>

        <Link to ={'../App/pages/Success'}>
           <button className="btn btn-success btn-sm m-2">Submit</button>
           </Link>



         
      


    </form>
  
  );
  

}




export default UserForm;
