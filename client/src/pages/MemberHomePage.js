import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Route } from "react-router-dom";
import NavbarPage from "../components/Navbar";
import MemberSidenav from "../components/MemberSidenav";

import MemberSide from "../components/BasicSideNavBar";

export default class MemberHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MID: window.location.pathname.split("/").pop()
    };
  }

  componentDidMount() {
    this.getMemberProfile();
  }
  getMemberProfile() {
    fetch(`/api/member/viewMember`)
      .then(res => res.json())
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  }
  render() {
    return (
      <div id="postData">
        <Route>
          {" "}
          <div>
            {" "}
            <MemberSide />;
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
