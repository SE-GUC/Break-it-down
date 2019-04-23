import React, { Component } from "react";
import { Button, Col, Form } from "react-bootstrap";
import axios from "axios";
import validator from "../validations/validation";

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}
function getValue(item) {
  var value = item.name;
  return value;
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
      skills: [{ name: "" }],
      certificates: [{ name: "" }],
      interests: [{ name: "" }],
      password: "",
      birthday: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "Egypt"
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
  handleChange(e) {
    console.log(e.target.value);
    this.setState({ city: e.target.value });
  }

  async handleSubmit(event) {
    console.log("handled");
    const info = {
      field: this.state.field,
      name: this.state.name,
      password: this.state.password,
      birthday: this.state.birthday,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      address: this.state.city + "-" + this.state.address,
      skills: this.state.skills.map(getValue),
      interests: this.state.interests.map(getValue),
      certificates: this.state.certificates.map(getValue)
    };
    const isValidated = validator.createAccountValidation(info);
    if (isValidated.error) alert(isValidated.error.details[0].message);
    else
      await axios
        .post("/api/CreateAccount/member", info)
        .then(function(response) {
          console.log("member create is successful");
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

  handleSelect(eventKey) {
    alert(`selected ${eventKey}`);
    this.setState({ value: eventKey });
  }

  handleSkillNameChange = idx => evt => {
    const newSkill = this.state.skills.map((skill, sidx) => {
      if (idx !== sidx) return skill;
      return { ...skill, name: evt.target.value };
    });

    this.setState({ skills: newSkill });
  };

  handleAddSkill = () => {
    this.setState({
      skills: this.state.skills.concat([{ name: "" }])
    });
  };

  handleRemoveSkill = idx => () => {
    this.setState({
      skills: this.state.skills.filter((s, sidx) => idx !== sidx)
    });
  };

  handleInterestNameChange = idx => evt => {
    const newInterest = this.state.interests.map((interest, sidx) => {
      if (idx !== sidx) return interest;
      return { ...interest, name: evt.target.value };
    });

    this.setState({ interests: newInterest });
  };

  handleAddInterest = () => {
    this.setState({
      interests: this.state.interests.concat([{ name: "" }])
    });
  };

  handleRemoveInterest = idx => () => {
    this.setState({
      interests: this.state.interests.filter((s, sidx) => idx !== sidx)
    });
  };

  handleCertificateNameChange = idx => evt => {
    const newC = this.state.certificates.map((certificate, sidx) => {
      if (idx !== sidx) return certificate;
      return { ...certificate, name: evt.target.value };
    });

    this.setState({ certificates: newC });
  };

  handleAddCertificate = () => {
    this.setState({
      certificates: this.state.certificates.concat([{ name: "" }])
    });
  };

  handleRemoveCertificate = idx => () => {
    this.setState({
      certificates: this.state.certificates.filter((s, sidx) => idx !== sidx)
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
          <Form.Row>
            <Form.Group as={Col} controlId="formGridInterest">
              <Form.Label>Interests</Form.Label>
              {this.state.interests.map((interest, idx) => (
                <div className="interest">
                  <input
                    type="text"
                    placeholder={`Interest ${idx + 1} `}
                    value={interest.name}
                    onChange={this.handleInterestNameChange(idx)}
                  />
                  <button
                    type="button"
                    onClick={this.handleRemoveInterest(idx)}
                    className="small"
                  >
                    -
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={this.handleAddInterest}
                className="small"
              >
                Add
              </button>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridSkill">
              <Form.Label>Skills</Form.Label>
              {this.state.skills.map((skill, idx) => (
                <div className="skill">
                  <input
                    type="text"
                    placeholder={`Skill ${idx + 1} `}
                    value={skill.name}
                    onChange={this.handleSkillNameChange(idx)}
                  />
                  <button
                    type="button"
                    onClick={this.handleRemoveSkill(idx)}
                    className="small"
                  >
                    -
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={this.handleAddSkill}
                className="small"
              >
                Add
              </button>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCertificate1">
              <Form.Label>Certificates</Form.Label>
              {this.state.certificates.map((certificate, idx) => (
                <div className="certificate">
                  <input
                    type="text"
                    placeholder={`Certificate ${idx + 1} `}
                    value={certificate.name}
                    onChange={this.handleCertificateNameChange(idx)}
                  />
                  <button
                    type="button"
                    onClick={this.handleRemoveCertificate(idx)}
                    className="small"
                  >
                    -
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={this.handleAddCertificate}
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

export default signUpMember;
