import React, { Component } from 'react';
import UpdateForm from './partnerreqChangeForm';

class partnerreqChange extends Component {
  
    constructor(props){
        super(props);
        this.state = { 
        }
        
      }
      getz = async (e) => {

        e.preventDefault();
        
        let databody ={
        "description" : e.target.elements.description.value


        
    }
    const PID = this.props.match.params.PID
    const TID = this.props.match.params.TID
    await fetch(`/api/partner/RequestDescriptionChange/${PID}/${TID}`, {
         method: 'PUT',
         body: JSON.stringify(databody),
         headers: {
             'Content-Type': 'application/json'
         },
     })
     .then(res => res.json())
     .then(data => console.log(data));
 
   }
   render() {

    return (

      <div className="App">
       <UpdateForm getz={this.getz} change={this.handleChange}/>
  
    </div>
);
}
   
}
 




export default partnerreqChange;
