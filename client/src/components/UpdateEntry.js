import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { Card } from "react-bootstrap";

class UpdateEntry extends Component {
  state = {
    name: "",

    email: ""
  };
  getStyle = () => {
    return {
      background: "#ffffff",
      padding: "10px",
      borderBottom: "1px #000000 solid",
      textDecoration: "none",
      textAlign: "center"
    };
  };

  componentDidMount() {
    const id = this.props.id;

    axios
      .get(`/api/admin/viewUser/${id}`)

      .then(res => {
        const name = res.data.name;

        const email = res.data.email;

        this.setState({ name: name, email: email });
      });
  }

  render() {
    return (
      <div style={this.getStyle()}>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <p style={{ color: "#000000" }}>
              {"User with email " +
                this.state.email +
                " and name " +
                this.state.name +
                " wants to update " +
                (this.props.updt.type === undefined
                  ? ""
                  : "type to " + this.props.updt.type + " ") +
                (this.props.updt.name === undefined
                  ? ""
                  : ", name to " + this.props.updt.name + " ")  +
                (this.props.updt.email === undefined
                  ? ""
                  : ", email to " + this.props.updt.email + " ") +
                (this.props.updt.phoneNumber === undefined
                  ? ""
                  : ", phoneNumber to " + this.props.updt.phoneNumber + " ") +
                (this.props.updt.field === undefined
                  ? ""
                  : ", field to " + this.props.updt.field + " ") +
                (this.props.updt.memberTasks === undefined
                  ? ""
                  : ", memberTasks to " + this.props.updt.memberTasks + " ") +
                (this.props.updt.activation === undefined
                  ? ""
                  : ", activation to " + this.props.updt.activation + " ") +
                (this.props.updt.address === undefined
                  ? ""
                  : ", address to " + this.props.updt.address + " ") +
                (this.props.updt.birthday === undefined
                  ? ""
                  : ", birthday to " + this.props.updt.birthday + " ") +
                (this.props.updt.skills === undefined
                  ? ""
                  : ", skills to " + this.props.updt.skills + " ") +
                (this.props.updt.interests === undefined
                  ? ""
                  : ", interests to " + this.props.updt.interests + " ") +
                (this.props.updt.accomplishments === undefined
                  ? ""
                  : ", accomplishments to " +
                    this.props.updt.accomplishments +
                    " ") +
                (this.props.updt.trainers === undefined
                  ? ""
                  : ", trainers to " + this.props.updt.trainers + " ") +
                (this.props.updt.trainingPrograms === undefined
                  ? ""
                  : ", trainingPrograms to " +
                    this.props.updt.trainingPrograms +
                    " ") +
                (this.props.updt.partners === undefined
                  ? ""
                  : ", partners to " + this.props.updt.partners + " ") +
                (this.props.updt.boardMembers === undefined
                  ? ""
                  : ", boardMembers to " + this.props.updt.boardMembers + " ") +
                (this.props.updt.events === undefined
                  ? ""
                  : ", events to " + this.props.updt.events + " ") +
                (this.props.updt.reports === undefined
                  ? ""
                  : ", reports to " + this.props.updt.reports + " ") +
                (this.props.updt.tasks === undefined
                  ? ""
                  : ", tasks to " + this.props.updt.tasks + " ") +
                (this.props.updt.certificates === undefined
                  ? ""
                  : ", certificates to " + this.props.updt.certificates + " ") +
                (this.props.updt.website === undefined
                  ? ""
                  : ", website to " + this.props.updt.website + " ") +
                (this.props.updt.description === undefined
                  ? ""
                  : ", description to " + this.props.updt.description + " ") +
                (this.props.updt.facilities === undefined
                  ? ""
                  : ", facilities to " + this.props.updt.facilities + " ") +
                (this.props.updt.rooms === undefined
                  ? ""
                  : ", rooms to " + this.props.updt.rooms)}
              <button
                onClick={this.props.approve.bind(
                  this,
                  this.props.id,
                  this.props.updt._id
                )}
                type="button"
                class="btn btn-outline-success"
              >
                Approve
              </button>{" "}
              {"  "}
              <button
                onClick={this.props.disapprove.bind(
                  this,
                  this.props.id,
                  this.props.updt._id
                )}
                type="button"
                class="btn btn-outline-danger"
              >
                Disapprove
              </button>
            </p>
            <div
          class="alert alert-secondary"
          role="alert"
          style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        >
          Copyright © 2019 Lirtenhub Inc. All Rights Reserved.{" "}
        </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

UpdateEntry.propTypes = {
  updt: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

export default UpdateEntry;
