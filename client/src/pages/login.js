import React, { Component } from "react";
import { Jumbotron, Button, Form } from "react-bootstrap";
import {NavLink} from "react-router-dom";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

class Login extends Component {
  constructor(props) {
    super(props);
    //this.goToSignUp = this.goToSignUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isLoading: false
    };
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
        <Jumbotron>
          <h1>Welcome to LIRTEN HUB!</h1>
          <p>Create Your Own Future</p>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button
              variant="flat"
              size="xxl"
              block
              onClick={!this.state.isLoading ? this.handleClick : null}
            >
              {this.state.isLoading ? "Loading…" : "SIGN IN"}
            </Button>
            <Link to={`/signUp`}>
              <NavLink to="/signUp">Don't have an account yet? SIGN UP</NavLink>
            </Link>
          </Form>
        </Jumbotron>
      </div>
    );
  }
}

export default Login;
