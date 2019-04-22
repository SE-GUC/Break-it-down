import React, { Component } from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PartnerSidenav from "../components/BasicSideNavBar";

//import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class partnermyTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descript: [],
      //  PID: this.props.match.params.PID,
      visible: true,
      modalIsOpen: false
    };
  }

  componentWillMount() {
    this.getDescription();
  }

  getDescription = async () => {
    const PID = this.props.match.params.PID;
    await fetch("/api/partner/myTasks")
      .then(res => res.json())
      .then(descript => this.setState({ descript }))
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  };

  toggleAlert() {
    this.setState({
      visible: !this.state.visible
    });
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  render() {
    //const PID = this.props.match.params.PID;
    let descript = this.state.descript || [];

    console.log("hiiiiiiiiiiiii");
    return (
      <div className="App">
        <PartnerSidenav />
        <br />
        <h1> Your Tasks </h1>
        <br />
        <br />

        {descript.length ? (
          <div>
            {descript.map(el => {
              return (
                <div
                  key={el.taskID}
                  class="card border-warning mb-3"
                  style={{ width: "800px", margin: "0 auto" }}
                >
                  <h5 class="card-header">{"Task ID" + "  " + el.taskID}</h5>
                  <div class="card-body">
                    <p class="card-text">{"name:   " + el.name}</p>
                    <p class="card-text">
                      {"description:   " + el.description}
                    </p>
                    <p class="card-text">{"field:   " + el.field}</p>
                    <p class="card-text">
                      {"wants Consultancy:   " + el.wantsConsultant}
                    </p>
                    <p class="card-text">{"approved:   " + el.approved}</p>
                    <p class="card-text">{"rate:   " + el.rate}</p>
                    <p class="card-text">{"review:   " + el.review}</p>
                    <p class="card-text">{"required skills:   " + el.skills}</p>
                    <Link to={`/myTasks/RequestDescriptionChange/${el.taskID}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                        Update your Task
                      </Button>
                    </Link>
                    &nbsp;
                    <Link to={`/myTasks/TaskLifeCycle/${el.taskID}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                        View Task's Life cycle
                      </Button>
                    </Link>
                    &nbsp;
                    <Link to={`/myTasks/${el.taskID}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                        Assign an applicant
                      </Button>
                    </Link>
                    &nbsp;
                    <br />
                    <br />
                    <Link to={`/myTasks/viewConsultancy/${el.taskID}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                        Assign a consultancy
                      </Button>
                    </Link>
                    &nbsp;
                    <Link to={`/myTasks/ReviewandRate/${el.taskID}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                        Review & rate applicant
                      </Button>
                    </Link>
                    &nbsp;
                    <br />
                    <br />
                  </div>
                  <br />
                  <br />
                  <br />
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <br />
            <h2>No available tasks</h2>
          </div>
        )}
        <br />
        <br />
        <br />
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

export default partnermyTask;

{
  /* <Link to={`/TaskLifeCycle/${PID}/${el.taskID}`}>
<Button variant="primary" size="lg" color="blue" active>
  View Task's Life cycle
</Button>
</Link>
&nbsp;
<br />
<br />
<Link to={`/view/${el.taskID}`}>
<Button variant="primary" size="lg" color="blue" active>
  view and assign a Task's applicant
</Button>
</Link>
&nbsp;
<br />
<br />
<Link to={`/viewConsultancy/${PID}/${el.taskID}`}>
<Button variant="primary" size="lg" color="blue" active>
  view and assign a Task's consultancy
</Button>
</Link>
&nbsp;
<br />
<br />
<Link to={`/ReviewandRate/${PID}/${el.taskID}`}>
<Button variant="primary" size="lg" color="blue" active>
  Review and rate the applicant for the assigned task
</Button>
</Link>
&nbsp; */
}
