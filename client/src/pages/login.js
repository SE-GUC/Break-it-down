import React, { Component } from "react";
import { Jumbotron, Button, Form, ButtonToolbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import validator from "../validations/validation";
import "bootstrap/dist/css/bootstrap.min.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  async handleSignIn(event) {
    console.log("handled");
    const info = {
      email: this.state.email,
      password: this.state.password
    };
    const isValidated = validator.loginValidation(info);
    if (isValidated.error) alert(isValidated.error.details[0].message);
    else
      await axios
        .post("http://localhost:4000/api/CreateAccount/login", info)
        .then(function(response) {
          console.log("login is successful");
          /*event.preventDefault();
          window.location = "/";*/
        })
        .catch(function(error) {
          alert("Wrong Password");
          console.log(error);
        });
  }

  async handleGoogle() {
    const profile = await axios.get("http://localhost:4000/auth/google");
    console.log("using google");
  }

  handleSelect(eventKey) {
    alert(`selected ${eventKey}`);
    this.setState({ value: eventKey });
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
    .btn-google{
      background-color: red;
      color: white;}
    center: {
    marginLeft: "auto",
    marginRight: "auto"
  }

    `}
        </style>

        <Jumbotron>
          <h1>Welcome to LIRTEN HUB!</h1>
          <p>Create Your Own Future</p>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={evt => this.updateEmail(evt)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={evt => this.updatePassword(evt)}
              />
            </Form.Group>

            <Button
              variant="flat"
              size="xxl"
              block
              onClick={e => this.handleSignIn(e)}
            >
              SIGN IN
            </Button>
            <Link to={`/signUp`}>
              <NavLink to="/signUp">Don't have an account yet? SIGN UP</NavLink>
            </Link>
          </Form>
          <br />
          <ButtonToolbar>
            <Button variant="google" onClick={this.handleGoogle}>
              Sign in with Google+
            </Button>
          </ButtonToolbar>
        </Jumbotron>
      </div>
    );
  }
}

export default Login;
