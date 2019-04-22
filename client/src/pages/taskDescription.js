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
import axios from "axios";
import {Grid} from '@material-ui/core/Grid'

class taskDescription extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      descript: []
    };
  }

  componentDidMount() {
    this.getDescription();
  }

  ApproveTasks(Id, TId){
    axios.put(`/api/admin/ApproveTasks/${Id}/${TId}`)
         .then( res => {alert("Task Approved successfully!")})
         .catch(error =>{
          this.setState({error})
          alert(error.message+". Approving the task was unsuccessful! please try again");
        })
  }
  DisapproveTasks(Id, TId){
    axios.delete(`/api/admin/DisapproveTasks/${Id}/${TId}`)
         .then( res => {alert("Task Disapproved successfully!")})
         .catch(error =>{
          this.setState({error})
          alert(error.message+". Disapproving the task was unsuccessful! please try again");
        })
  }
  getDescription = async () => {
    await fetch(`http://localhost:4000/api/admin/getUnapprovedTasks`)
    .then(res => res.json())
    .then(descript => this.setState({ descript }))
    // .catch(error =>{
    //   this.setState({error})
    //   alert(error.message+". No Unapproved tasks were found!");
    // })
  };

  render() {
   let descript = this.state.descript || {}
    return ( 
     
       
      <div className="App">
        <h1> Submitted Task's Description </h1>
        <CardDeck>
              { descript.map((d,i)=>

                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                        <p>
                            <br/>
                            <Card.Title> {d.name} </Card.Title>
                            <Card.Text> {d.description} </Card.Text>
                        </p>
                    <Button variant="info"onClick={this.DisapproveTasks.bind(this, d.pid, d.taskID)}>Disapprove</Button> {         }
                    <Button variant="info"onClick={this.ApproveTasks.bind(this, d.pid, d.taskID)}>Approve</Button> 
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

  export default taskDescription;
// {                          <Button variant="info"onClick={this.notifyUser.bind(this)}>Send Email</Button>
// }