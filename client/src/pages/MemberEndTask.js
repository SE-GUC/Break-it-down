import React, { Component } from "react";
import MemberSide from "../components/BasicSideNavBar";

class MemberEndTask extends Component {
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
    const taskID = this.props.match.params.taskID;
    await fetch(`/api/member/endMyTask/${taskID}`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(descript => this.setState({ descript }));
  };

  render() {
    let descript = this.state.descript;

    return (
      <div className="App">
        <MemberSide />
        <br />
        <h1>End Task </h1>
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

export default MemberEndTask;
