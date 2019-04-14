import React, { Component } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavbarPage extends Component {
  state = {
    whichPage: this.props.whichPage
  };
  render() {
    return (
      <Navbar bg="dark" variant="dark" sticky="top">
        <Nav className="mr-auto">
          <Link to={`/`}>
            <button className="btn btn-link m-2">Home</button>
          </Link>
          <Link to={`/viewCoworkingSpace`}>
            <button className="btn btn-link m-2">viewCoworkingSpace</button>
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

export default NavbarPage;
