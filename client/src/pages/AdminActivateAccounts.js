import React, { Component } from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {Card} from "react-bootstrap";
import {CardDeck} from "react-bootstrap";
import {Form} from "react-bootstrap";
import AdminNavbar from '../components/AdminNavbar'

class AdminActivateAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done:"",
      users :[]
    };
  }

  auth = async () => {
    await fetch(
      `/api/admin/ActivateAccounts/`
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
    this.getDeactivatedUsers();  
  }

  activateAccount(Id){
    axios.put(`/api/admin/ActivateAccounts/${Id}`)
         .then(res=>{this.getDeactivatedUsers()})
         .then( res => {alert("User Account activated successfully!")})
         .catch(error =>{
          this.setState({error})
          alert(error.message+". activation was not successful!");
        })
  }

  getDeactivatedUsers = async ()=> {
      await fetch(`http://localhost:4000/api/admin/getDeactivatedAccounts`)
      .then(res => res.json())
      .then(users => this.setState({ users }))
      .catch(error => {
        alert("no deactivated accounts were found!");
        window.location = "/";
        return error;
      });

  };

  render() {
    let users = this.state.users || {}

    return (
      <div className="App" style={{alignItems:'center'}}>
       <AdminNavbar/>
        <h1> Activate Accounts </h1>
            <h3>Deactivated Users</h3>

            <br/>

      <CardDeck>
        { users.map((user,i)=>
          <div>              <br/>

            <Card style={{ width: '20rem'  }  } >
              <Card.Body>
            
                    <p>
                        <br/>
                        <Card.Title> {user.name} </Card.Title>
                        <Card.Text>  {user.type}
                                    <br/>
                                     {user.email} </Card.Text>
                    </p>

                    <Form onSubmit={this.activateAccount.bind(this, user._id)}>
                    <Button variant="dark"onClick={this.activateAccount.bind(this, user._id)}>Activate</Button> 
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

  export default AdminActivateAccounts;



  
