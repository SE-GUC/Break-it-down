import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import PartnerSidenav from "../components/BasicSideNavBar";

class partnerNotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descript: []
    };
  }

  componentWillMount() {
    this.getDescription();
  }

  // Retrieves the list of items from the Express app
  getDescription = async () => {
    await fetch(`/api/partner/getNotifications`)
      .then(res => res.json())
      .then(descript => this.setState({ descript }))
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  };

  render() {
    let descript = this.state.descript || {};

    {
      console.log(descript);
    }
    return (
      <div className="App">
        <PartnerSidenav />
        <br />
        <h1>Notifications </h1>
        {descript.map(el => {
          return (
            <ListGroup>
              <div key={el.notifID}>
                <span>
                  <ListGroup.Item variant="info">
                    Sender: {el.senderName}
                  </ListGroup.Item>
                </span>
                <span>
                  <ListGroup.Item variant="info">
                    {el.notificationContent}
                  </ListGroup.Item>
                </span>
                <br />
                <br />
              </div>
            </ListGroup>
          );
        })}
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

export default partnerNotify;
