import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import PartnerSidenav from "../components/BasicSideNavBar";

class partnerviewApplicants extends Component {
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
    const idT =  this.props.match.params.TID;
    const TID = this.props.match.params.TID;
    await fetch(`/api/partner/view/${TID}`)
      .then(res => res.json())
      .then(descript => this.setState({ descript }));
  };

  render() {
    const idT =  this.props.match.params.TID;
    let descript = this.state.descript || {};

    {
      console.log(descript);
    }
    return (
      <div className="App">
        <PartnerSidenav />
        <br />
        <h1>Your Task's applicants </h1>
        {descript.length ? (
         <div>
                   {descript.map(el => {
          return (
            <ListGroup>
              <div key={el.applicantID}>
                <span>
                  <ListGroup.Item variant="info">
                    applicantID: {el.applicantID}
                  </ListGroup.Item>
                </span>
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
                <span>
                  <ListGroup.Item variant="info">
                    accepted: {JSON.stringify(el.accepted)}{" "}
                    {"                         "}
                    {"          "}
                    <Link to={`/myTasks/AcceptApplicant/${idT}/${el.applicantID}`}>
                    <button type="button" class="btn btn-success">
                      Accept applicant
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

        </div>
     ) : (
  <div>
    <h2>{"there is consultancy agency Assigned to accept applicants"}</h2>
    <div
          class="alert alert-secondary"
          role="alert"
          style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        >
          Copyright © 2019 Lirten Inc. All Rights Reserved.{" "}
        </div>
  </div>
)}

      </div>
    );
  }
}

export default partnerviewApplicants;


