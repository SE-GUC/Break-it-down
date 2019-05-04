import React, { Component } from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";
import {CardDeck} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {Label} from "reactstrap";
import {Input} from "reactstrap";
import {FormGroup} from "reactstrap";
import axios from "axios";
import AdminNavbar from '../components/AdminNavbar'


var Mongoose = require("mongoose");
var ObjectId = Mongoose.Types.ObjectId;

class AdminNotifyToSignContract extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      location: "",
      date: null,
      time: null, 
      Id: null

    };
    this.notifyUser.bind(this);
  };

  auth = async () => {
    await fetch(
      `/api/admin/NotifyUsersToSignContract/`
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
    this.getUsers();
  };

  notifyUser = event =>{
    const info ={
      location: this.state.location,
      date: this.state.date,
      time: this.state.time,
    };
    const Id = ObjectId(this.state.Id) 

        axios.put(`/api/admin/NotifyUsersToSignContract/${Id}`, info )
             .then( res => {alert("Email sent successfully!")})
             .catch(error =>{
              this.setState({error})
              alert(error.message+". Email was not sent!");
              
            })  
  };

  getUsers = async () => {
    await fetch(`http://localhost:4000/api/admin/getUnregisteredUsers`)
    .then(res => res.json())
    .then(users => this.setState({ users }))
    .catch(error =>{
      this.setState({error})
      alert(error.message+". system error please try again later!");
    }) 

  };

  updateLocation(evt) {
    this.setState({
      location: evt.target.value
    });
  };

  updateDate(evt) {
    this.setState({
      date: evt.target.value
    });
  };
  
  updateTime(evt) {
    this.setState({
      time: evt.target.value
    });
  };

  updateId(id) {
    this.setState({
      Id: id
    });
  };


  render() {
    let users = this.state.users || {}
    
    return (
      
      <div className="App">
       <AdminNavbar/>
        <h1> Signed up Users who still didn't sign the contract  </h1>
        <br/>
        <CardDeck>
        { users.map((user,i)=>

          <div>
            <Card style={{ width: '20rem' }} onChange={this.updateId.bind(this, user._id)}>
              <Card.Body>
            
                    <p>
                        <br/>
                        <Card.Title> {user.name} </Card.Title>
                        <Card.Text>  {user.type} </Card.Text>
                        
                    </p>
   
                    <Form >
           
                      <FormGroup>
                        <Label for="exampleDate">Date</Label>
                        <Input
                          type="date"
                          name="date"
                          id="exampleDate"
                          placeholder="date"
                          onChange={evt => this.updateDate(evt)}
                        />

                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleTime">Time</Label>
                        <Input
                          type="time"
                          name="time"
                          id="exampleTime"
                          placeholder="time"
                          onChange={evt => this.updateTime(evt)}
                        />

                      </FormGroup>
                      <Form.Group controlId="formBasicPassword">
                        <Label for="exampleLocation">Location</Label>
                        <Input 
                         type="text"
                         name="location" 
                         placeholder="location"
                         onChange={evt => this.updateLocation(evt)}
                        />

                      </Form.Group>
                      <Form.Group controlId="formBasicChecbox">
                      </Form.Group>

                      <Button
                       variant="dark" 
                       onClick={e => this.notifyUser(e)}

                      >Send</Button>

                    </Form>

              </Card.Body>
              </Card>
              <br/>
              <br/>
              </div>
              )
            }

              </CardDeck>
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



  export default AdminNotifyToSignContract;


  //              <Card.Img variant="top" src="holder.js/100px180" />
  //<Form.Control type="location" placeholder="location" />
