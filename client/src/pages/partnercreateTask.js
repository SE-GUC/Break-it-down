import React, { Component } from "react";
import UserForm from "./partnerform";

class partnercreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getUser = async e => {
    e.preventDefault();

    let databody = {
      name: e.target.elements.name.value,
      description: e.target.elements.description.value,
      wantsConsultant: e.target.elements.wantsConsultant.value,
      field: e.target.elements.field.value
    };
    await fetch(`/api/partner/createTask`, {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => alert(data.data))
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  };
  render() {
    return (
      <div className="App">
        <UserForm getUser={this.getUser} change={this.handleChange} />
      </div>
    );
  }
}

export default partnercreateTask;
