import React, { Component } from "react";
import PartnerSidenav from "../components/BasicSideNavBar";

class partnerAcceptCons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descript: []
    };
  }

  componentWillMount() {
    this.getDescription();
  }

  // Retrieves the list of items from the Express app
  getDescription = async () => {
    const idT = this.props.match.params.idT;
    const idA = this.props.match.params.idA;
    await fetch(`/api/partner/ChooseConsultancyAgency/${idT}/${idA}`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(descript => this.setState({ descript }))
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  };

  render() {
    let descript = this.state.descript;

    return (
      <div className="App">
        <PartnerSidenav />
        <br />
        <h1>Accept Consultancy </h1>
        {console.log(descript)}
        <h1 style={{ color: "#9c27b0" }}>{descript.data}</h1>
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

        <div
          class="alert alert-secondary"
          role="alert"
          style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        >
          Copyright © 2019 Lirten Inc. All Rights Reserved.
        </div>
      </div>
    );
  }
}

export default partnerAcceptCons;
