import React, { Component } from 'react';
import Scheform from './Schform';


class Createsch extends Component {
    getUser = (e) => {

        e.preventDefault();
        
        let databody ={
        "scheduleNumber" : e.target.elements.id.value,
       "Date" : e.target.elements.Date.value,
        "time" : e.target.elements.time.value,
      //  "reserved" : false,
       // "reservedBy" :[]
    }
    
       //console.log(id);
       const coID = this.props.match.params.coID;
       const rID = this.props.match.params.rID;
       fetch(`/api/coworkingspace/createSchedule/${coID}/${rID}`, {
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
    
        return (
    
          <div className="App">
    
            
    
            <Scheform getUser={this.getUser} />
            
        </div>
    );
}
}
export default Createsch;