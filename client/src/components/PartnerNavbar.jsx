import React, { Component } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo2 from "../../../src/Logo2.svg"

class PartnerNavbar extends Component {
  state = {
    whichPage: this.props.whichPage,

  };
  render() {

    return (
      
      <Navbar style={{backgroundColor:"#bcc0da"}}>
        <Nav className="mr-auto">
          <text >...............</text>
          <img style={{ width:200, height:70}} src={Logo2}/>
          <Link to={`/`}>
            <button className="btn btn-link m-2" style={{fontWeight: 'bold',color:"#3f51b5"}}> Home</button>
          </Link>


          <Link to={"/App/pages/vision"}>
            <button className="btn btn-link m-2" style={{fontWeight: 'bold',color:"#3f51b5"}}>vision</button>
          </Link>
        
          
        </Nav>

        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
        <Nav.Link href="#home">SignOut</Nav.Link>
      </Navbar>
    );
  }
}

export default PartnerNavbar;
