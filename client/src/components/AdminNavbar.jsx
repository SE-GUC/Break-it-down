import React, { Component } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo2 from "../Logo2.svg";
import axios from "axios";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import Adminside from "./Adminside";
import Search from "./Search";

class NavbarPage extends Component {
  state = {
    whichPage: this.props.whichPage,
    id: null
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Navbar>
      <Adminside />
        <Nav className="mr-auto">
          <img style={{ width: "33%", height: "10%" }} src={Logo2} />
        </Nav>

        <Search/>

        <footer
          class="page-footer font-small blue"
          style={{
            color: "#ffffff",
            textAlign: "center",
            position: "fixed",
            bottom: "0",
            width: "100%",
            padding: "0.5rem"
          }}
        >
          <div class="footer-copyright text-center py-3" className="fixed-bottom"> 
          Copyright © 2019 Lirtenhub Inc. All Rights Reserved.
          </div>{" "}
        </footer>
      </Navbar>
    );
  }
}

export default NavbarPage;
