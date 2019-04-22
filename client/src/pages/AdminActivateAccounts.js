import React, { Component } from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {Card} from "react-bootstrap";
import {CardDeck} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {FormGroup} from "reactstrap";


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
      <div className="App" style={{alignItems:'center'}}>
        <h1> Activate Accounts </h1>
            <h3>Deactivated Users</h3>

        

            <CardDeck>
        { users.map((user,i)=>
          <div>
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
                    <Button variant="info"onClick={this.activateAccount.bind(this, user._id)}>Activate</Button> 
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
        <Link to={'/'}>
           <Button variant="info">Done </Button>
        </Link>   
      </div>
    );
  }
}

  export default AdminActivateAccounts;



  