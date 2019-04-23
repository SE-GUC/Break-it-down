import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import PartnerSidenav from "../components/BasicSideNavBar";

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
    const idT = this.props.match.params.TID;
    const TID = this.props.match.params.TID;
    await fetch(`/api/partner/viewConsultancy/${TID}`)
      .then(res => res.json())
      .then(descript => this.setState({ descript }))
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  };

  render() {
    let descript = this.state.descript || {};
    const idT = this.props.match.params.TID;
    {
      console.log(descript);
    }
    return (
      <div className="App">
        <PartnerSidenav />
        <br />
        <h1>Your Task's Consultancies </h1>
        {descript.map(el => {
          return (
            <ListGroup>
              <div key={el.consultancyID}>
                <span>
                  <ListGroup.Item variant="info">
                    consultancyID: {el.consultancyID}
                  </ListGroup.Item>
                </span>
                <span>
                  <span>
                    <ListGroup.Item variant="info">
                      name: {el.name}
                    </ListGroup.Item>
                  </span>
                  <span>
                    <ListGroup.Item variant="info">
                      skills: {el.skills}
                    </ListGroup.Item>
                  </span>
                  <ListGroup.Item variant="info">
                    accepted: {JSON.stringify(el.accepted)}{" "}
                    {"                         "}
                    {"          "}
                    <Link
                      to={`/myTasks/ChooseConsultancyAgency/${idT}/${
                        el.consultancyID
                      }`}
                    >
                      <button type="button" class="btn btn-success">
                        Accept Consultancy
                      </button>
                    </Link>
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
