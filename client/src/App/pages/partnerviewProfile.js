import React, { Component } from 'react';
import {ListGroup} from "react-bootstrap";
import PartnerNavbar from "../components/PartnerNavbar"
import PartnerSidnav from "../components/PartnerSidenav"

class partnerviewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          descript: []
        };
      }


      componentWillMount() {
        this.getDescription();
      }

      getDescription = async () => {
        const PID = this.props.match.params.PID;
        await fetch(`http://localhost:4000/api/partner/viewProfile/${PID}`)
        .then(res => res.json())
        .then(descript => this.setState({ descript }));
        
      };
      render() {
        let descript = this.state.descript || []

        return(
            <div className="App">
     <PartnerNavbar/>
     <PartnerSidnav/>
           <br>
           </br>
            <h1> Your profile</h1>
            <ListGroup>    
        <ListGroup.Item variant="list-group-item list-group-item-secondary">Name:  { descript.name }</ListGroup.Item>
        <ListGroup.Item variant="list-group-item list-group-item-warning">Description:  { descript.description }</ListGroup.Item>
        <ListGroup.Item variant="list-group-item list-group-item-secondary">email:  { descript.email }</ListGroup.Item>
        <ListGroup.Item variant="list-group-item list-group-item-warning">Field:  { descript.field } </ListGroup.Item>
        <ListGroup.Item variant="list-group-item list-group-item-secondary">membership expiry date:  { descript.membershipExpiryDate } </ListGroup.Item>
        <ListGroup.Item variant="list-group-item list-group-item-warning">address:  { descript.address } </ListGroup.Item>
        <ListGroup.Item variant="list-group-item list-group-item-secondary">website:  { descript.website } </ListGroup.Item>
        <ListGroup.Item variant="list-group-item list-group-item-warning">phone number :  { descript.phoneNumber } </ListGroup.Item>
        <ListGroup.Item variant="list-group-item list-group-item-secondary">partners:  { descript.partners } </ListGroup.Item>

        </ListGroup>
              <div class="alert alert-secondary" role="alert" style={{ position:"fixed",bottom:0,left:0,right:0}}>
              Copyright © 2019 Lirten Inc. All Rights Reserved.              </div>
          </div>
          );
    
      }















}
 
export default partnerviewProfile;