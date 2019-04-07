import axios from "axios";
import React, { Component } from "react";
import { Jumbotron, Button, Col, Form } from "react-bootstrap";

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
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
      address: ""
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

    await axios
      .post("http://localhost:4000/api/CreateAccount/partner", {
        name: this.state.name,
        password: this.state.password,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        website: this.state.website,
        description: this.state.description
      })
      .then(function(response) {
        console.log("partner create is successful");
      })
      .catch(function(error) {
        console.log(error);
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
        <Jumbotron>
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
                <Form.Control as="select">
                  <option>other</option>
                  <option>10th of Ramadan City</option>
                  <option>6 of October</option>
                  <option>Alexandria</option>
                  <option>Cairo</option>
                  <option>Giza</option>
                  <option>Helwan</option>
                  <option>Cairo</option>
                  <option>New Cairo</option>
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
                <Form.Control placeholder="Board Member 1" />
              </Form.Group>
              <Form.Group as={Col} controlId="formBoardMember2">
                <Form.Label>.</Form.Label>
                <Form.Control placeholder="Board Member 2" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridBoardMember3">
                <Form.Label>.</Form.Label>
                <Form.Control placeholder="Board Member 3" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridBoardMember4">
                <Form.Label>.</Form.Label>
                <Form.Control placeholder="Board Member 4" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPartner1">
                <Form.Label>Partners</Form.Label>
                <Form.Control placeholder="Partner 1" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPartner2">
                <Form.Label>.</Form.Label>
                <Form.Control placeholder="Partner 2" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPartner3">
                <Form.Label>.</Form.Label>
                <Form.Control placeholder="Partner 3" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPartner4">
                <Form.Label>.</Form.Label>
                <Form.Control placeholder="Partner 4" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTask1">
                <Form.Label>Tasks</Form.Label>
                <Form.Control placeholder="Task 1" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridTask2">
                <Form.Label>.</Form.Label>
                <Form.Control placeholder="Task 2" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridTask3">
                <Form.Label>.</Form.Label>
                <Form.Control placeholder="Task 3" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridTask4">
                <Form.Label>.</Form.Label>
                <Form.Control placeholder="Task 4" />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridBoardEvents">
              <Form.Label>Upcoming Event</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="Agreed to terms & conditions"
              />
            </Form.Group>

            <Button
              variant="flat"
              size="xxl"
              type="submit"
              onClick={event => this.handleSubmit(event)}
            >
              Submit
            </Button>
          </Form>
        </Jumbotron>
      </div>
    );
  }
}

export default signUpPartner;
