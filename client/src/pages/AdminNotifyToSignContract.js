import React, { Component } from "react";
import {ListGroup} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";
import {CardDeck} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {Label} from "reactstrap";
import {Input} from "reactstrap";
import {FormGroup} from "reactstrap";

import AdminNavbar from '../components/AdminNavbar'

var Mongoose = require("mongoose");
var ObjectId = Mongoose.Types.ObjectId;


class AdminNotifyToSignContract extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  notifyUser = async (e, Id)  => {
    e.preventDefault();
    let databody ={
    "date" : e.target.elements.date.value,
    "time" : e.target.elements.time.value,
    "location":e.target.elements.location.value,
    }

    await fetch(`http://localhost:4000/api/admin/NotifyUsersToSignContract/${Id}`, {
      method: 'PUT',
       body: JSON.stringify(databody),
       headers: {'Content-Type': 'application/json' },
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error =>{
        this.setState({error})
        alert(error.message+". ERROR! mail wasn't sent, please try again!!");
      })  
  }

  getUsers = async () => {
    await fetch(`http://localhost:4000/api/admin/getUnregisteredUsers`)
    .then(res => res.json())
    .then(users => this.setState({ users }));

  };


  render() {
    let users = this.state.users || {}
    return (
      
      <div className="App">
      <AdminNavbar/>
        <h1> Signed up Users who still didn't sign the contract  </h1>
        <CardDeck>
        { users.map((user,i)=>

            <Card style={{ width: '18rem' }}>
              <Card.Body>
            
                    <p>
                        <br/>
                        <Card.Title> {user.name} </Card.Title>
                        <Card.Text> {user.type} </Card.Text>
                    </p>
   
                    <Form onSubmit= {this.notifyUser.bind(this)}>
           
                      <FormGroup>
                        <Label for="exampleDate">Date</Label>
                        <Input
                          type="date"
                          name="date"
                          id="exampleDate"
                          placeholder="date placeholder"
                      
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleTime">Time</Label>
                        <Input
                          type="time"
                          name="time"
                          id="exampleTime"
                          placeholder="time placeholder"
                        />
                      </FormGroup>

                      <Form.Group controlId="formBasicPassword">
                        <Label for="exampleLocation">Location</Label>
                        <Form.Control type="location" placeholder="Enter Location" />
                      </Form.Group>

                      <Form.Group controlId="formBasicChecbox">
                      </Form.Group>
                     
                      <Button variant="info"onClick={this.notifyUser.bind(this)}>Send Email</Button>

                    </Form>

              </Card.Body>
              </Card>
              )
            }

              </CardDeck>
        <br/>

        <Link to={'/'}>
           <Button variant="info">Done </Button>

        </Link> 
   
       
      </div>
    );
  }
}



  export default AdminNotifyToSignContract;


  //              <Card.Img variant="top" src="holder.js/100px180" />
