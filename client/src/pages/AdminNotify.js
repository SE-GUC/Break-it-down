import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";
import AdminNavbar from '../components/AdminNavbar'

class AdminNotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descript: []
    };
  }

  auth = async () => {
    await fetch(
      `/api/admin/notification/`
    )
      .then(res => res.json())
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
    
  };
  componentWillMount() {
    // this.auth();
    this.getDescription();
  }

  // Retrieves the list of items from the Express app
  getDescription = async () => {
    await fetch(`/api/admin/getNotifications`)
      .then(res => res.json())
      .then(descript => this.setState({ descript }))
      .catch(error =>{
        this.setState({error})
        alert(error.message+". no notifications for this user!");
        window.location = "/";
        return error;
      })
  };

  render() {
    let descript = this.state.descript || {};

    {
      console.log(descript);
    }
    return (
      <div className="App">
       <AdminNavbar/>
       
        <br />
        <h1>Notifications </h1>
        <br/>
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
                 <br/>
                <br />
              </div>
            </ListGroup>
          );
        })}

        <br/>
        <br/>
        <Link to={'/admin'}>
           <Button variant="warning">Done </Button>
        </Link>    
        <div
          class="alert alert-secondary"
          role="alert"
          style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        >
          Copyright © 2019 Lirtenhub Inc. All Rights Reserved.{" "}
        </div>
      </div>
    );
  }
}

export default AdminNotify;


