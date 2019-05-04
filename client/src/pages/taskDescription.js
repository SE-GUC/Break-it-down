import React, { Component } from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";
import {CardDeck} from "react-bootstrap";
import axios from "axios";
import AdminNavbar from '../components/AdminNavbar'

class taskDescription extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      descript: []
    };
  }

  auth = async () => {
    await fetch(
      `/api/admin/getUnapprovedTasks/`
    )
      .then(res => res.json())
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
    
  };

  componentWillMount() {
    this.auth();
    this.getDescription();
  }

  ApproveTasks(Id, TId){
    axios.put(`/api/admin/ApproveTasks/${Id}/${TId}`)
         .then( res => {alert("Task Approved successfully!")})
         .then(res =>{this.getDescription()})
         .catch(error =>{
          this.setState({error})
          alert(error.message+". Approving the task was unsuccessful! please try again");
        })
  }
  DisapproveTasks(Id, TId){
    axios.delete(`/api/admin/DisapproveTasks/${Id}/${TId}`)
         .then( res => {alert("Task Disapproved successfully!")})
         .then(res =>{this.getDescription()})
         .catch(error =>{
          this.setState({error})
          alert(error.message+". Disapproving the task was unsuccessful! please try again");
        })
  }
  getDescription = async () => {
    await fetch(`/api/admin/getUnapprovedTasks`)
    .then(res => res.json())
    .then(descript => this.setState({ descript }))
    .catch(error =>{
      this.setState({error})
      alert(error.message+". No Unapproved tasks were found!");
    })
  };

  render() {
   let descript = this.state.descript || {}
    return ( 
     
       
      <div className="App">
        <h1> Submitted Task's Description </h1>
        <AdminNavbar/>
        <CardDeck>
              { descript.map((d,i)=>

                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                        <p>
                            <br/>
                            <Card.Title> {d.name} </Card.Title>
                            <Card.Text> {d.description} </Card.Text>
                        </p>
                    <Button variant="dark"onClick={this.DisapproveTasks.bind(this, d.pid, d.taskID)}>Disapprove</Button> {         }
                    <Button variant="warning"onClick={this.ApproveTasks.bind(this, d.pid, d.taskID)}>Approve</Button> 
                  </Card.Body>
                </Card>
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

  export default taskDescription;
// {                          <Button variant="info"onClick={this.notifyUser.bind(this)}>Send Email</Button>
// }
