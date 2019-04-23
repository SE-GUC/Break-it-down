import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import PartnerSidenav from "../components/BasicSideNavBar";

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
    await fetch(`/api/partner/viewProfile`)
      .then(res => res.json())
      .then(descript => this.setState({ descript }))
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  };
  render() {
    let descript = this.state.descript || [];

    return (
      <div className="App">
        <PartnerSidenav />
        <br />
        <h1> Your profile</h1>
        <ListGroup>
          <ListGroup.Item variant="list-group-item list-group-item-secondary">
            Name: {descript.name}
          </ListGroup.Item>
          <ListGroup.Item variant="list-group-item list-group-item-warning">
            Description: {descript.description}
          </ListGroup.Item>
          <ListGroup.Item variant="list-group-item list-group-item-secondary">
            email: {descript.email}
          </ListGroup.Item>
          <ListGroup.Item variant="list-group-item list-group-item-warning">
            Field: {descript.field}{" "}
          </ListGroup.Item>
          <ListGroup.Item variant="list-group-item list-group-item-secondary">
            membership expiry date: {descript.membershipExpiryDate}{" "}
          </ListGroup.Item>
          <ListGroup.Item variant="list-group-item list-group-item-warning">
            address: {descript.address}{" "}
          </ListGroup.Item>
          <ListGroup.Item variant="list-group-item list-group-item-secondary">
            website: {descript.website}{" "}
          </ListGroup.Item>
          <ListGroup.Item variant="list-group-item list-group-item-warning">
            phone number : {descript.phoneNumber}{" "}
          </ListGroup.Item>
          <ListGroup.Item variant="list-group-item list-group-item-secondary">
            partners: {descript.partners}{" "}
          </ListGroup.Item>
        </ListGroup>
        <div
          class="alert alert-secondary"
          role="alert"
          style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        >
          Copyright © 2019 Lirten Inc. All Rights Reserved.{" "}
        </div>
      </div>
    );
  }
}

export default partnerviewProfile;
