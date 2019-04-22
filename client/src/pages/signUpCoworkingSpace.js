import React, { Component } from "react";
import { Button, Col, Form } from "react-bootstrap";
import axios from "axios";
import validator from "../validations/validation";
import {
  faWifi,
  faRestroom,
  faUtensils,
  faThermometerHalf,
  faCar,
  faPrint,
  faUsers,
  faLock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

class signUpCoworkingSpace extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleWifi = this.handleWifi.bind(this);
    this.handleToilets = this.handleToilets.bind(this);
    this.handleAirConditioning = this.handleAirConditioning.bind(this);
    this.handleFood = this.handleFood.bind(this);
    this.handleLockers = this.handleLockers.bind(this);
    this.handleParking = this.handleParking.bind(this);
    this.handlePrinting = this.handlePrinting.bind(this);
    this.handleConferenceRooms = this.handleConferenceRooms.bind(this);

    this.state = {
      isLoading: false,
      inputList: [],
      name: "",
      password: "",
      email: "",
      address: "",
      website: "",
      phoneNumber: "",
      description: "",
      facilities: [],
      city: "Egypt"
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
    console.log(this.state.facilities);
    const info = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      address: this.state.city + "-" + this.state.address,
      phoneNumber: this.state.phoneNumber,
      address: this.state.city + "-" + this.state.address,
      website: this.state.website,
      description: this.state.description,
      facilities: this.state.facilities
    };
    const isValidated = validator.createAccountValidation(info);
    if (isValidated.error) alert(isValidated.error.details[0].message);
    else
      await axios
        .post("/api/CreateAccount/coworkingSpace", info)
        .then(function(response) {
          console.log("coworking space create is successful");
          alert(
            "Congratulations! Your account has been created successfully. A member of Lirten Hub's team will contact you soon to activate your account."
          );
          event.preventDefault();
          window.location = "/";
        })
        .catch(function(error) {
          alert("Use another email, this email is taken");
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
  handleChange(e) {
    console.log(e.target.value);
    this.setState({ city: e.target.value });
  }

  handleSelect(eventKey) {
    alert(`selected ${eventKey}`);
    this.setState({ value: eventKey });
  }

  handleWifi(e) {
    console.log(e.target.value);
    this.setState({ facilities: this.state.facilities.concat(["Free Wifi"]) });
    console.log(this.state.facilities);
  }

  handleToilets() {
    console.log("toilets chosen");
    this.setState({ facilities: this.state.facilities.concat(["Toilets"]) });
    console.log(this.state.facilities);
  }

  handleFood() {
    console.log("Food & Drinks chosen");
    this.setState({
      facilities: this.state.facilities.concat(["Food & Drinks"])
    });
  }
  handleAirConditioning() {
    console.log("air conditioning chosen");
    this.setState({
      facilities: this.state.facilities.concat(["Air Conditioning"])
    });
  }
  handleParking() {
    console.log("parking chosen");
    this.setState({
      facilities: this.state.facilities.concat(["Parking Area"])
    });
  }
  handlePrinting() {
    console.log("printing chosen");
    this.setState({
      facilities: this.state.facilities.concat(["Printing & Scanning"])
    });
  }
  handleConferenceRooms() {
    console.log("conference rooms chosen");
    this.setState({
      facilities: this.state.facilities.concat(["Conference Rooms"])
    });
  }
  handleLockers() {
    console.log("lockers chosen");
    this.setState({
      facilities: this.state.facilities.concat(["Private Lockers"])
    });
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
          <div key={`custom-inline-${"radio"}`} className="mb-3">
            <Form.Label>Facilities</Form.Label>
            <br />
            <FontAwesomeIcon icon={faWifi} />
            <Form.Check
              custom
              inline
              value="Free WiFi"
              label="Free WiFi"
              type={"radio"}
              onChange={evt => this.handleWifi(evt)}
              id={`custom-inline-${"radio"}-1`}
            />
            <FontAwesomeIcon icon={faRestroom} />
            <Form.Check
              custom
              inline
              value="Toilets"
              label="Toilets"
              type={"radio"}
              onChange={this.handleToilets}
              id={`custom-inline-${"radio"}-2`}
            />
            <FontAwesomeIcon icon={faUtensils} />

            <Form.Check
              custom
              inline
              label="Food & Drinks"
              type={"radio"}
              onChange={this.handleFood}
              id={`custom-inline-${"radio"}-3`}
            />
            <FontAwesomeIcon icon={faThermometerHalf} />
            <Form.Check
              custom
              inline
              label="Air Conditioning"
              type={"radio"}
              onChange={this.handleAirConditioning}
              id={`custom-inline-${"radio"}-4`}
            />
            <FontAwesomeIcon icon={faCar} />
            <Form.Check
              custom
              inline
              label="Parking Area"
              type={"radio"}
              onChange={this.handleParking}
              id={`custom-inline-${"radio"}-5`}
            />
            <FontAwesomeIcon icon={faPrint} />
            <Form.Check
              custom
              inline
              label="Printing & Scanning"
              type={"radio"}
              onChange={this.handlePrinting}
              id={`custom-inline-${"radio"}-6`}
            />
            <FontAwesomeIcon icon={faUsers} />
            <Form.Check
              custom
              inline
              label="Conference Rooms"
              type={"radio"}
              onChange={this.handleConferenceRooms}
              id={`custom-inline-${"radio"}-7`}
            />
            <FontAwesomeIcon icon={faLock} />
            <Form.Check
              custom
              inline
              label="Private Lockers"
              type={"radio"}
              onChange={this.handleLockers}
              id={`custom-inline-${"radio"}-8`}
            />
          </div>
        </Form>
        <Button
          variant="flat"
          size="xxl"
          type="submit"
          onClick={event => this.handleSubmit(event)}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default signUpCoworkingSpace;
