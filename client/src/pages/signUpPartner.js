import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Form, Alert } from "react-bootstrap";
import validator from "../validations/validation";

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}
function getValue(item) {
  var value = item.name;
  return value;
}

class signUpPartner extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isLoading: false,
      inputList: [],
      name: "",
      password: "",
      email: "",
      address: "",
      website: "",
      phoneNumber: "",
      field: "",
      description: "",
      address: "",
      city: "Egypt",
      partners: [{ name: "" }],
      boardMembers: [{ name: "" }]
    };
  }
  updateDescription(evt) {
    this.setState({
      description: evt.target.value
    });
  }
  updateWebsite(evt) {
    this.setState({
      website: evt.target.value
    });
  }
  updateName(evt) {
    this.setState({
      name: evt.target.value
    });
  }
  updateAddress(evt) {
    this.setState({
      address: evt.target.value
    });
  }
  updateField(evt) {
    this.setState({
      field: evt.target.value
    });
  }
  updatePassword(evt) {
    this.setState({
      password: evt.target.value
    });
  }
  updateEmail(evt) {
    this.setState({
      email: evt.target.value
    });
  }
  updatePhoneNumber(evt) {
    this.setState({
      phoneNumber: evt.target.value
    });
  }

  async handleSubmit(event) {
    console.log("handled");

    const info = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      address: this.state.city + "-" + this.state.address,
      website: this.state.website,
      description: this.state.description,
      boardMembers: this.state.boardMembers.map(getValue),
      partners: this.state.partners.map(getValue)
    };
    const isValidated = validator.createAccountValidation(info);
    if (isValidated.error) alert(isValidated.error.details[0].message);
    else
      await axios
        .post("/api/CreateAccount/partner", info)
        .then(function(response) {
          console.log("partner create is successful");
          alert(
            "Congratulations! Your account has been created successfully. A member of Lirten Hub's team will contact you soon to activate your account."
          );
          event.preventDefault();
          window.location = "/";
        })
        .catch(function(error) {
          console.log(error);
          alert("Use another email, this email is taken");
        });
  }

  handleClick() {
    this.setState({ isLoading: true }, () => {
      simulateNetworkRequest().then(() => {
        this.setState({ isLoading: false });
      });
    });
  }

  handleSelect(eventKey) {
    alert(`selected ${eventKey}`);
    this.setState({ value: eventKey });
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({ city: e.target.value });
  }

  handleBoardMemberNameChange = idx => evt => {
    const newBoardMember = this.state.boardMembers.map((boardMember, sidx) => {
      if (idx !== sidx) return boardMember;
      return { ...boardMember, name: evt.target.value };
    });

    this.setState({ boardMembers: newBoardMember });
  };

  handleAddBoardMember = () => {
    this.setState({
      boardMembers: this.state.boardMembers.concat([{ name: "" }])
    });
  };

  handleRemoveBoardMember = idx => () => {
    this.setState({
      boardMembers: this.state.boardMembers.filter((s, sidx) => idx !== sidx)
    });
  };

  handlePartnerNameChange = idx => evt => {
    const newPartner = this.state.partners.map((partner, sidx) => {
      if (idx !== sidx) return partner;
      return { ...partner, name: evt.target.value };
    });

    this.setState({ partners: newPartner });
  };

  handleAddPartner = () => {
    this.setState({
      partners: this.state.partners.concat([{ name: "" }])
    });
  };

  handleRemovePartner = idx => () => {
    this.setState({
      partners: this.state.partners.filter((s, sidx) => idx !== sidx)
    });
  };

  render() {
    return (
      <div>
        <style type="text/css">
          {`
    .btn-flat {
      background-color: orange;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
        </style>
        <br />
        <h1>Create an account</h1>
        <br />
        <h3>Step 2: Fill in your details </h3>
        <Form>
          <Form.Group controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Enter Name"
              onChange={evt => this.updateName(evt)}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="e.g. lirtenHub@email.com"
                onChange={evt => this.updateEmail(evt)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={evt => this.updatePassword(evt)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder="e.g. street, building"
                onChange={evt => this.updateAddress(evt)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                as="select"
                value={this.state.city}
                onChange={e => this.handleChange(e)}
              >
                <option value="Egypt">other</option>
                <option value="10th of Ramadan City">
                  10th of Ramadan City
                </option>
                <option value="6 of October">6 of October</option>
                <option value="Alexandria">Alexandria</option>
                <option value="Cairo">Cairo</option>
                <option value="Giza">Giza</option>
                <option value="Helwan">Helwan</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formGridPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control onChange={evt => this.updatePhoneNumber(evt)} />
          </Form.Group>
          <Form.Group controlId="formGridWebsite">
            <Form.Label>Website</Form.Label>
            <Form.Control onChange={evt => this.updateWebsite(evt)} />
          </Form.Group>
          <Form.Group controlId="formGridDescription">
            <Form.Label>Company Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              onChange={evt => this.updateDescription(evt)}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridBoardMember1">
              <Form.Label>Board Members</Form.Label>
              {this.state.boardMembers.map((boardMember, idx) => (
                <div className="boardMember">
                  <input
                    type="text"
                    placeholder={`Board Member ${idx + 1} `}
                    value={boardMember.name}
                    onChange={this.handleBoardMemberNameChange(idx)}
                  />
                  <button
                    type="button"
                    onClick={this.handleRemoveBoardMember(idx)}
                    className="small"
                  >
                    -
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={this.handleAddBoardMember}
                className="small"
              >
                Add
              </button>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPartner1">
              <Form.Label>Partners</Form.Label>
              {this.state.partners.map((partner, idx) => (
                <div className="partner">
                  <input
                    type="text"
                    placeholder={`Partner ${idx + 1} `}
                    value={partner.name}
                    onChange={this.handlePartnerNameChange(idx)}
                  />
                  <button
                    type="button"
                    onClick={this.handleRemovePartner(idx)}
                    className="small"
                  >
                    -
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={this.handleAddPartner}
                className="small"
              >
                Add
              </button>
            </Form.Group>
          </Form.Row>

          <Button
            variant="flat"
            size="xxl"
            type="button"
            onClick={event => this.handleSubmit(event)}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default signUpPartner;
