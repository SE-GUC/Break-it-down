import React, { Component } from "react";
import { Jumbotron, Button, Col, Form } from "react-bootstrap";
import axios from "axios";

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

class signUpMember extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isLoading: false,
      inputList: [],
      name: "",
      field: "",
      skill1: "",
      skill2: "",
      skill3: "",
      skill4: "",
      certificate1: "",
      certificate2: "",
      certificate3: "",
      certificate4: "",
      password: "",
      birthday: "",
      email: "testing@test.com",
      phoneNumber: "00000000",
      address: ""
    };
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
  updateSkill1(evt) {
    this.setState({
      skill1: evt.target.value
    });
  }
  updateSkill2(evt) {
    this.setState({
      skill2: evt.target.value
    });
  }
  updateSkill3(evt) {
    this.setState({
      skill3: evt.target.value
    });
  }
  updateSkill4(evt) {
    this.setState({
      skill4: evt.target.value
    });
  }
  updateCertificate1(evt) {
    this.setState({
      certificate1: evt.target.value
    });
  }
  updateCertificate2(evt) {
    this.setState({
      certificate2: evt.target.value
    });
  }
  updateCertificate3(evt) {
    this.setState({
      certificate3: evt.target.value
    });
  }
  updateCertificate4(evt) {
    this.setState({
      certificate4: evt.target.value
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
  updateBirthday(evt) {
    this.setState({
      birthday: evt.target.value
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

  handleClick() {
    this.setState({ isLoading: true }, () => {
      simulateNetworkRequest().then(() => {
        this.setState({ isLoading: false });
      });
    });
  }

  async handleSubmit(event) {
    console.log("handled");
    await axios
      .post("http://localhost:4000/api/CreateAccount/member", {
        field: this.state.field,
        name: this.state.name,
        password: this.state.password,
        birthday: this.state.birthday,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address
      })
      .then(function(response) {
        console.log("member create is successful");
      })
      .catch(function(error) {
        console.log(error);
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
            <Form.Group controlId="formGridBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                onChange={evt => this.updateBirthday(evt)}
              />
            </Form.Group>

            <Form.Group controlId="formGridField">
              <Form.Label>Field</Form.Label>
              <Form.Control
                placeholder="e.g. Front end design"
                onChange={evt => this.updateField(evt)}
              />
            </Form.Group>

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
                  onChange={evt => this.updateCity(evt)}
                >
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
            <div key={`custom-inline-${"radio"}`} className="mb-3">
              <Form.Label>Interests</Form.Label>
              <br />
              <Form.Check
                custom
                inline
                label="Science"
                type={"radio"}
                id={`custom-inline-${"radio"}-1`}
              />
              <Form.Check
                custom
                inline
                label="Business"
                type={"radio"}
                id={`custom-inline-${"radio"}-2`}
              />
              <Form.Check
                custom
                inline
                label="Graphic Designing"
                type={"radio"}
                id={`custom-inline-${"radio"}-3`}
              />
              <Form.Check
                custom
                inline
                label="Front End"
                type={"radio"}
                id={`custom-inline-${"radio"}-4`}
              />
              <Form.Check
                custom
                inline
                label="Back End"
                type={"radio"}
                id={`custom-inline-${"radio"}-5`}
              />
            </div>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridSkill1">
                <Form.Label>Skills</Form.Label>
                <Form.Control
                  placeholder="Skill 1"
                  onChange={evt => this.updateSkill1(evt)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formSkill2">
                <Form.Label>.</Form.Label>
                <Form.Control
                  placeholder="Skill 2"
                  onChange={evt => this.updateSkill2(evt)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridSkill3">
                <Form.Label>.</Form.Label>
                <Form.Control
                  placeholder="Skill 3"
                  onChange={evt => this.updateSkill3(evt)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridSkill4">
                <Form.Label>.</Form.Label>
                <Form.Control
                  placeholder="Skill 4"
                  onChange={evt => this.updateSkill4(evt)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCertificate1">
                <Form.Label>Certificates</Form.Label>
                <Form.Control
                  placeholder="Certificate 1"
                  onChange={evt => this.updateCertificate1(evt)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formCertificate2">
                <Form.Label>.</Form.Label>
                <Form.Control
                  placeholder="Certificate 2"
                  onChange={evt => this.updateCertificate2(evt)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCertificate3">
                <Form.Label>.</Form.Label>
                <Form.Control
                  placeholder="Certificate 3"
                  onChange={evt => this.updateCertificate3(evt)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCertificate4">
                <Form.Label>.</Form.Label>
                <Form.Control
                  placeholder="Certificate 4"
                  onChange={evt => this.updateCertificate4(evt)}
                />
              </Form.Group>
            </Form.Row>
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

export default signUpMember;
