import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import PartnerNavbar from "../components/PartnerNavbar";
import PartnerSidenav from "../components/PartnerSidenav";

class partnerviewConsultancies extends Component {
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
    const PID = this.props.match.params.PID;
    const TID = this.props.match.params.TID;
    await fetch(
      `/api/partner/viewConsultancy/${PID}/${TID}`
    )
      .then(res => res.json())
      .then(descript => this.setState({ descript }));
  };

  render() {
    let descript = this.state.descript || {};

    {
      console.log(descript);
    }
    return (
      <div className="App">
        <PartnerNavbar />
        <PartnerSidenav />
        <br />
        <h1>Your Task's Consultancies </h1>
        {descript.map(el => {
          return (
            <ListGroup>
              <div key={el.applicantID}>
                <span>
                  <ListGroup.Item variant="info">
                    consultancyID: {el.consultancyID}
                  </ListGroup.Item>
                </span>
                <span>
                  <ListGroup.Item variant="info">
                    accepted: {JSON.stringify(el.accepted)}{" "}
                    {"                         "}
                    {"          "}
                    <button type="button" class="btn btn-success">
                      Accept Consultancy
                    </button>
                  </ListGroup.Item>
                </span>
                <span>
                  <ListGroup.Item variant="info">
                    assigned: {JSON.stringify(el.assigned)}
                  </ListGroup.Item>
                </span>
                <br />
              </div>
            </ListGroup>
          );
        })}
        <div
          class="alert alert-secondary"
          role="alert"
          style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        >
          Copyright © 2019 Lirten Inc. All Rights Reserved.{" "}
        </div>
      </div>
    );
  }
}

export default partnerviewConsultancies;
