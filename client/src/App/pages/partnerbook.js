import React, { Component } from 'react';
import PartnerNavbar from "../components/PartnerNavbar"
import PartnerSidnav from "../components/PartnerSidenav"
class partnerbook extends Component {
constructor(props){
    super(props);
    this.state={
        descript:[]
     }
    
  }
  componentWillMount() {
    this.getDescription();
  }

         // Retrieves the list of items from the Express app
         getDescription = async () => {

            const userID = this.props.match.params.userID
            const id = this.props.match.params.id
            const id2 = this.props.match.params.id2
            const id3 = this.props.match.params.id3
            await fetch(`http://localhost:4000/api/partner/cospace/rooms/${userID}/${id}/${id2}/${id3}`, {
                method: 'PUT',
            })
            .then(res => res.json())
            .then(descript => this.setState( {descript} ));
        };
        
        render() {
            let descript = this.state.descript
     
         return (
     
           <div className="App">
     <PartnerNavbar/>
     <PartnerSidnav/>
     <br>
       </br>
        <h1>Room Booking </h1>
{console.log(descript)}
<h1 style={{color:"#9c27b0"}}>{descript.data}</h1>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div class="alert alert-secondary" role="alert" style={{ position:"fixed",bottom:0,left:0,right:0}}>
          Copyright © 2019 Lirten Inc. All Rights Reserved.       
      </div>
      </div>
         
     );
     }
        
     }
      
     
     
     
     
     export default partnerbook;
     
     
