import React, { Component } from "react";
import PartnerNavbar from "../../App/components/PartnerNavbar";
import PartnerSidenav from "../../App/components/PartnerSidenav";

//import Logo2 from "../../../src/Logo2.png"
class partnerHome extends Component {
  state = {
    PID: "5c9114781c9d440000a926ce",
    userID: "5c9114781c9d440000a926ce"
  };
  render() {
    return (
      <div id="postData">
        <PartnerNavbar />
        <PartnerSidenav />

        <h1>Welcome to your home page</h1>
        <br />

        <p>
          <div
            class="alert alert-secondary"
            role="alert"
            style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          >
            Copyright © 2019 Lirten Inc. All Rights Reserved.
          </div>
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
export default partnerHome;
