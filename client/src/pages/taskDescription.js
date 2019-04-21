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
      <AdminNavbar/>
        <h1> Submitted Task's Description </h1>
        <CardDeck>
              { descript}
                 {/*
                  descript.map((d,i)=>
                  <Card style={{ width: '18rem' }}>
                  <Card.Body>
                
                        <p>
                            <br/>
                            <Card.Title> {d.name} </Card.Title>
                            <Card.Text> {d.description} </Card.Text>
                        </p>
       
                  </Card.Body>
                  </Card>
                  )
              } */}
         </CardDeck>

        <br/>
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