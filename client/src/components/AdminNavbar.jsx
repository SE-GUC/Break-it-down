import React, { Component } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo2 from "../Logo2.svg";
import axios from "axios";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import Adminside from "./Adminside";

class NavbarPage extends Component {
  state = {
    whichPage: this.props.whichPage,
    id: null
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    axios
      .get(`/api/admin/viewUser/${this.state.id}`)
      .then(res => {
        alert("Name: " + res.data.name + "\nEmail:" + res.data.email);
      })
      .catch(error => {
        this.setState({ error });
        alert(error.message + ". User not found !");
      });
  }

  render() {
    return (
      <Navbar style={{ backgroundColor: "#ffffff" }}>
      <Adminside />
        <Nav className="mr-auto">
          <img style={{ width: "33%", height: "10%" }} src={Logo2} />
        </Nav>

        <Form inline onSubmit={this.onSubmit.bind(this)}>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            name="id"
            onChange={this.onChange.bind(this)}
          />
          <Button type="submit" variant="outline-info">
            Search
          </Button>
        </Form>

        <footer
          class="page-footer font-small blue"
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            textAlign: "center",
            position: "fixed",
            bottom: "0",
            width: "100%",
            padding: "0.5rem"
          }}
        >
          <div class="footer-copyright text-center py-3">
            © 2019 Copyright: LIRTENHUB
          </div>{" "}
        </footer>
      </Navbar>
    );
  }
}

export default NavbarPage;
