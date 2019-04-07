import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavbarPage from "../components/Navbar";
//import coworkingspace from "./viewCoworkingSpaces";
export default class UserHomePage extends Component {
  render() {
    return (
      <div id="postData">
        <Route>
          {" "}
          <div>
            {" "}
            <NavbarPage whichPage="Home" />{" "}
          </div>{" "}
        </Route>

        <h1>Welcome Lirten Hub</h1>
        {/* Link to List.js */}

        <Link to={`./viewCoworkingSpace`}>
          <button type="submit" className="btn btn-success btn-sm m-2">
            view coworking spaces
          </button>
        </Link>
      </div>
    );
  }
}
