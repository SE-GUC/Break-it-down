import React, { Component } from 'react';
import horse from "../../horsy.gif";

class Success extends Component {
    state = {  }

    render() { 
        return (  
            <div>
        <h1 style={{color:'green'}}>Your Task was created successfully</h1>
        <p style={{color:'green'}}>your task is pending approval</p>
        <img style={{ width: 100, height: 70 }} src={horse} />

         </div>
      
        );
    }
    
  
}
 


export default Success;
