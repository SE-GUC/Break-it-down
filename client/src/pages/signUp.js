import React, { Component } from "react";
import { Jumbotron, Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import lirtenHub from "../lirtenHub.png";

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

class signUp extends Component {
  constructor(props) {
    super(props);
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
          <h1>Create an account</h1>
          <br />
          <h3>Step 1: Choose account type</h3>
          <br />
          <Link to={`/signup/educationalorganization`}>
            <ButtonToolbar>
              <Button variant="flat" size="xxl" block>
                Educational Organization
              </Button>
            </ButtonToolbar>
          </Link>

          <br />
          <Link to={`/signup/consultancyagency`}>
            <ButtonToolbar>
              <Button variant="flat" size="xxl" block>
                Consultancy Agency
              </Button>
            </ButtonToolbar>
          </Link>
          <br />
          <Link to={`/signup/coworkingspace`}>
            <ButtonToolbar>
              <Button variant="flat" size="xxl" block>
                Coworking Space
              </Button>
            </ButtonToolbar>
          </Link>
          <br />
          <Link to={`/signup/member`}>
            <ButtonToolbar>
              <Button variant="flat" size="xxl" block>
                Member
              </Button>
            </ButtonToolbar>
          </Link>
          <br />
          <Link to={`/signup/partner`}>
            <ButtonToolbar>
              <Button variant="flat" size="xxl" block>
                Partner
              </Button>
            </ButtonToolbar>
          </Link>
          <br />
        </Jumbotron>
      </div>
    );
  }
}

export default signUp;
