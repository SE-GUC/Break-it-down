import React, { Component } from 'react';
import UserForm from './form';
import { Link } from 'react-router-dom';

class CreateRoom extends Component {

    constructor(props){
        super(props);
        this.state = {
          rID:null
        }
        this.handleChange = this.handleChange.bind(this);
      }
      handleChange(e) {
        this.setState({rID:e.target.value});
      }

    getUser = (e) => {

        e.preventDefault();
        
        let databody ={
        "roomNumber" : e.target.elements.id.value,
        "capacity" : e.target.elements.capacity.value,
        "schedule" : e.target.elements.schedule
    }
    
       //console.log(id);
       const coID = this.props.match.params.coID
       fetch(`/api/coworkingspace/createRoom/${coID}`, {
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
        const coID = window.location.pathname.split("/").pop();
        return (
    
          <div className="App">
    
            
    
            <UserForm getUser={this.getUser} change={this.handleChange}/>
            
        </div>
    );
}
}
export default CreateRoom;