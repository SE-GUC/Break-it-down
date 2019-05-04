import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Icon, Container, Header } from "semantic-ui-react";
import Side from "./BasicSideNavBar";

class ContactUs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
          position: "absolute",

          left: "50%",

          top: "50%",

          transform: "translate(-50%, -50%)"
        }}
      >
        <Container text>
          <Header as="h1" color="orange">
            <Icon name="at" size="small" />
            Email: lirten_hub@companies.com
          </Header>
          <Header as="h1" color="orange">
            <Icon name="call" size="small" />
            Phone Number:+201019992999
          </Header>
          <Header as="h1" color="orange">
            <Icon name="location arrow" size="small" />
            Address: Cairo,Egypt
          </Header>
        </Container>
      </div>
    );
  }
}

export default ContactUs;
