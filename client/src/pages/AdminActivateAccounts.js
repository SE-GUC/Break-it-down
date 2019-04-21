import React, { Component } from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import AdminNavbar from '../components/AdminNavbar'

class AdminActivateAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done:"",
      users :[]
    };
  }

  componentDidMount() {
    this.getDeactivatedUsers();  
  }

  activateAccount(Id){
    axios.put(`/api/admin/ActivateAccounts/${Id}`)
         .then( res => {alert("User Account activated successfully!")})
         .catch(error =>{
          this.setState({error})
          alert(error.message+". activation was not successful!");
        })
  }

  getDeactivatedUsers = async ()=> {
      await fetch(`http://localhost:4000/api/admin/getDeactivatedAccounts`)
      .then(res => res.json())
      .then(users => this.setState({ users }));
  };

  render() {
    let users = this.state.users || {}

    return (
      <div className="App">
      <AdminNavbar/>
        <h1> Activate Accounts </h1>
            <h3>Deactivated Users</h3>

            <p>
              {
                  users.map((user,i)=>
                  <p>
                      {user.email}
                      <br/>
                      <Button variant="info"onClick={this.activateAccount.bind(this, user._id)}>Activate</Button> 
                  </p>
                  )
              }
            </p> 
        
        <br/>
        <br/>
        <Link to={'/'}>
           <Button variant="info">Done </Button>
        </Link>   
      </div>
    );
  }
}

  export default AdminActivateAccounts;



  