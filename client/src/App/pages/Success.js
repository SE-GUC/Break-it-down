import React, { Component } from 'react';
class Success extends Component {
    state = {  }

    render() { 
        return (  
            <div>
        <h1 style={{color:'green'}}>Your Task was created successfully</h1>
        <p style={{color:'green'}}>your task is pending approval</p>
        <div class="spinner-border text-success" role="status">

        <span class="sr-only">Loading...</span>
       
  
         </div>


         </div>
      
        );
    }
    
  
}
 


export default Success;
