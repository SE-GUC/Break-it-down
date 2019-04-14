import React, { Component } from 'react';
import UserForm from './form';

class createTask extends Component {

    constructor(props){
        super(props);
        this.state = { 
        }
        
      }

      getUser = (e) => {

        e.preventDefault();
        
        let databody ={
        "name" : e.target.elements.name.value,
        "description" : e.target.elements.description.value,
        "wantsConsultant":e.target.elements.wantsConsultant.value
    }
    const id = this.props.match.params.id
    fetch(`http://localhost:4000/api/partner/createTask/${id}`, {
         method: 'POST',
         body: JSON.stringify(databody),
         headers: {
             'Content-Type': 'application/json'
         },
     })
     .then(res => res.json())
     .then(data => console.log(data));
 
   }
   render() {
    const id = window.location.pathname.split("/").pop();

    console.log(id)
    return (

      <div className="App">
       <UserForm getUser={this.getUser} change={this.handleChange}/>
  
    </div>
);
}
   
}
 




export default createTask;

