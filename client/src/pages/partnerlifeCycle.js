import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import PartnerSidenav from "../components/BasicSideNavBar";
import First from "../components/Lifecyclefirst";
import Second from "../components/LifecyclePosted";
import Third from "../components/LifecycleAssigned";
import Fourth from "../components/LifecycleStarted";
import Fifth from "../components/LifecycleFinished";
class partnerlifeCycle extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = async () => {
    const TID = this.props.match.params.TID;
    await fetch(`/api/partner/TaskLifeCycle/${TID}`)
      .then(res => res.json())
      .then(list => this.setState({ list }))
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
    //console.log(this.state.list);
  };

  render() {
    const { list } = this.state;
    console.log(list);
    if (
      list[0] === false &&
      list[1] === false &&
      list[2] === false &&
      list[3] === false
    ) {
      return (
        <div className="App">
          <PartnerSidenav />

          <br />
          <h1>Your Task's Life Cycle </h1>
          <First />
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

    if (
      list[0] === true &&
      list[1] === false &&
      list[2] === false &&
      list[3] === false
    ) {
      return (
        <div className="App">
          <PartnerSidenav />

          <br />
          <h1>Your Task's Life Cycle </h1>
          <Second />
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
    if (
      list[0] === true &&
      list[1] === true &&
      list[2] === false &&
      list[3] === false
    ) {
      return (
        <div className="App">
          <PartnerSidenav />

          <br />
          <h1>Your Task's Life Cycle </h1>
          <Third />
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
    if (
      list[0] === true &&
      list[1] === true &&
      list[2] === true &&
      list[3] === false
    ) {
      return (
        <div className="App">
          <PartnerSidenav />

          <br />
          <h1>Your Task's Life Cycle </h1>
          <Fourth />
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
    if (
      list[0] === true &&
      list[1] === true &&
      list[2] === true &&
      list[3] === true
    ) {
      return (
        <div className="App">
          <PartnerSidenav />

          <br />
          <h1>Your Task's Life Cycle </h1>
          <Fifth />
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
    return (
      <div className="App">
        <h1>Your Task's Life Cycle </h1>
      </div>
    );
  }
}

export default partnerlifeCycle;
