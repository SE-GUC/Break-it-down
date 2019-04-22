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
// import Side from "../components/BasicSideNavBar";

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
   
    let databody ={
    "date" : e.target.elements.date.value,
    "time" : e.target.elements.time.value,
    "location":e.target.elements.location.value,
    }
  console.log(e.target.elements.date.value)
  console.log(e.target.elements.time.value)
  console.log(e.target.elements.time.value)
    await fetch(`/api/admin/NotifyUsersToSignContract/${Id}`, {
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
    await fetch(`/api/admin/getUnregisteredUsers`)
    .then(res => res.json())
    .then(users => this.setState({ users }));

  };


  render() {
    let users = this.state.users || {}
    
    return (
      
      <div className="App">
      {/* <Side /> */}
        <h1> Signed up Users who still didn't sign the contract  </h1>
        <CardDeck>
        { users.map((user,i)=>

          <div>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
            
                    <p>
                        <br/>
                        <Card.Title> {user.name} </Card.Title>
                        <Card.Text> {user.type} </Card.Text>
                    </p>
   
                    <Form onSubmit={this.notifyUser.bind(this, user._id)}>
           
                      <FormGroup>
                        <Label for="exampleDate">Date</Label>
                        <Input
                          type="date"
                          name="date"
                          id="exampleDate"
                          placeholder="date"
                      
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleTime">Time</Label>
                        <Input
                          type="time"
                          name="time"
                          id="exampleTime"
                          placeholder="time"
                        />
                      </FormGroup>

                      <Form.Group controlId="formBasicPassword">
                        <Label for="exampleLocation">Location</Label>
                        <Input  type="text" name="location" placeholder="location"/>

                      </Form.Group>

                      <Form.Group controlId="formBasicChecbox">
                      </Form.Group>
                                 
                      <Button variant="info" onClick={this.notifyUser.bind(this, user._id)}>Send Email</Button>
                     
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

        <Link to={'/'}>
           <Button variant="info">Done </Button>

        </Link> 
   
       
      </div>
    );
  }
}



  export default AdminNotifyToSignContract;


  //              <Card.Img variant="top" src="holder.js/100px180" />
  //<Form.Control type="location" placeholder="location" />
