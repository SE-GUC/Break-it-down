import React, { Component } from "react";
import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
  NavItem
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Logo1 from "../Logo1.svg";
class NavbarPage extends Component {
  state = {
    whichPage: this.props.whichPage
  };
  render() {
    return (
      <Navbar style={{ backgroundColor: "#005a73" }}>
        <Nav className="mr-auto">
          <text>..............</text>
          <img style={{ width: 200, height: 70 }} src={Logo1} />;
          <Nav.Link href="/">Home</Nav.Link>
          <NavItem>
            <Nav.Link href="/viewCoworkingSpace/">viewCoworkingSpace</Nav.Link>
          </NavItem>
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
