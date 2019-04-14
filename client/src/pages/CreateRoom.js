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
        "id" : e.target.elements.id.value,
        "capacity" : e.target.elements.capacity.value,
        "schedule" : e.target.elements.schedule
    }
    
       //console.log(id);
       const coID = this.props.match.params.coID
       fetch(`http://localhost:4000/api/coworkingspace/createRoom/${coID}`, {
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
        let {rID} = this.state;
        console.log(rID)
        return (
    
          <div className="App">
    
            
    
            <UserForm getUser={this.getUser} change={this.handleChange}/>

            <Link to={`/coworkingSpace/createSchedule/${coID}/${rID}`}>
              <button type="submit" className="btn btn-success btn-sm m-2">Create a schedule</button>
            </Link>
            
        </div>
    );
}
}
export default CreateRoom;