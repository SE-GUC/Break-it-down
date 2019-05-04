import React, { Component } from "react";
import axios from "axios";
import validator from "../validations/validation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dimmer, Loader, Modal } from "semantic-ui-react";
import { Button } from "react-bootstrap";
import SignUpEducationalOrganization from "../pages/signUpEducationalOrganization";
import SignUpMember from "../pages/signUpMember";
import SignUpCoworkingSpace from "../pages/signUpCoworkingSpace";
import SignUpConsultancyAgency from "../pages/signUpConsultancyAgency";
import SignUpPartner from "../pages/signUpPartner";
import Side from "../components/BasicSideNavBar";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSignIn = this.handleSignIn.bind(this);

    this.state = {
      isLoading: false,

      email: "",

      password: "",

      userID: null,

      coID: null,

      type: null
    };

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn = event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    console.log("handled");

    const info = {
      email: this.state.email,

      password: this.state.password
    };

    const isValidated = validator.loginValidation(info);

    if (isValidated.error) alert(isValidated.error.details[0].message);
    else
      axios

        .post("/api/CreateAccount/login", info)

        .then(response => {
          axios

            .get("/api/CreateAccount/user/auth", {
              headers: { Authorization: response.data }
            })

            .then(response => {
              console.log(response.data.authorizedData.type);

              this.setState({
                coID: response.data.authorizedData.id,

                type: response.data.authorizedData.type
              });
            })

            .catch(error => {
              console.log(error);
            });

          // console.log(response.data);

          /*event.preventDefault();

          window.location = "/";*/
        })

        .catch(function(error) {
          alert("Wrong Email or Password! Please try again");

          console.log(error);
        });

    this.setState({ isLoading: false });
  };

  handleSignUp(e) {
    e.preventDefault();
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
    let loading;

    console.log(this.state.isLoading);

    if (this.state.isLoading == true)
      loading = (
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      );
    else loading = <div />;

    const img = require("../backgroundLogin.jpg");

    const divStyle = {
      width: "100%",

      height: "1000px",

      backgroundImage: `url(${img})`,

      backgroundSize: "cover"
    };

    if (this.state.coID === null) {
      return (
        <div className="cComponent" style={divStyle}>
          <Side />
          <div
            style={{
              position: "absolute",

              left: "50%",

              top: "50%",

              transform: "translate(-50%, -50%)"
            }}
          >
            <div class="ui placeholder segment">
              {loading}

              <div class="ui stackable very relaxed two column grid">
                <div class="column">
                  <form class="ui form">
                    <div class="field">
                      <label>Email</label>

                      <div class="ui left icon input">
                        <input
                          type="text"
                          placeholder="Email"
                          onChange={evt => this.updateEmail(evt)}
                        />

                        <i aria-hidden="true" class="user icon" />
                      </div>
                    </div>
                    <div class="field">
                      <label>Password</label>

                      <div class="ui left icon input">
                        <input
                          type="password"
                          placeholder="Password"
                          onChange={evt => this.updatePassword(evt)}
                        />

                        <i aria-hidden="true" class="lock icon" />
                      </div>
                    </div>
                    <button
                      class="ui secondary button"
                      onClick={e => this.handleSignIn(e)}
                    >
                      Login
                    </button>
                    <br />{" "}
                    <Modal
                      style={{
                        position: "absolute",

                        left: "50%",

                        top: "50%",

                        transform: "translate(-50%, -50%)"
                      }}
                      trigger={
                        <button
                          class="ui big button"
                          onClick={e => this.handleSignUp(e)}
                        >
                          <i aria-hidden="true" class="signup icon" />
                          Sign up
                        </button>
                      }
                      basic
                      size="small"
                    >
                      <Modal.Content>
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

                          <h1>Create an account</h1>

                          <br />

                          <h3>Step 1: Choose account type</h3>

                          <br />

                          <Modal
                            style={{
                              position: "absolute",

                              left: "50%",

                              top: "50%",

                              transform: "translate(-50%, -50%)"
                            }}
                            trigger={
                              <Button variant="flat" size="xxl" block>
                                Educational Organization
                              </Button>
                            }
                            basic
                            size="small"
                          >
                            <Modal.Content>
                              <SignUpEducationalOrganization />
                            </Modal.Content>
                          </Modal>

                          <br />

                          <Modal
                            style={{
                              position: "absolute",

                              left: "50%",

                              top: "50%",

                              transform: "translate(-50%, -50%)"
                            }}
                            trigger={
                              <Button variant="flat" size="xxl" block>
                                Consultancy Agency
                              </Button>
                            }
                            basic
                            size="small"
                          >
                            <Modal.Content>
                              <SignUpConsultancyAgency />
                            </Modal.Content>
                          </Modal>

                          <br />

                          <Modal
                            style={{
                              position: "absolute",

                              left: "50%",

                              top: "50%",

                              transform: "translate(-50%, -50%)"
                            }}
                            trigger={
                              <Button variant="flat" size="xxl" block>
                                Coworking Space
                              </Button>
                            }
                            basic
                            size="small"
                          >
                            <Modal.Content>
                              <SignUpCoworkingSpace />
                            </Modal.Content>
                          </Modal>

                          <br />

                          <Modal
                            style={{
                              position: "absolute",

                              left: "50%",

                              top: "50%",

                              transform: "translate(-50%, -50%)"
                            }}
                            trigger={
                              <Button variant="flat" size="xxl" block>
                                Member
                              </Button>
                            }
                            basic
                            size="small"
                          >
                            <Modal.Content>
                              <SignUpMember />
                            </Modal.Content>
                          </Modal>

                          <br />

                          <Modal
                            style={{
                              position: "absolute",

                              left: "50%",

                              top: "50%",

                              transform: "translate(-50%, -50%)"
                            }}
                            trigger={
                              <Button variant="flat" size="xxl" block>
                                Partner
                              </Button>
                            }
                            basic
                            size="small"
                          >
                            <Modal.Content>
                              <SignUpPartner />
                            </Modal.Content>
                          </Modal>

                          <br />
                        </div>
                      </Modal.Content>
                    </Modal>
                  </form>
                </div>

                <div class="middle aligned column">
                  <h1>
                    Welcome to <br />
                    LIRTEN HUB!
                  </h1>

                  <p>
                    Order is brought upon forthrightly from disorder. A small
                    action can lead to a massive outcome. The humble flip of a
                    fragile butterfly at one end of the storm.
                  </p>
                </div>
              </div>

              <div class="ui vertical divider" />
            </div>
          </div>
        </div>
      );
    } else if (this.state.type === "coworkingSpace") {
      // console.log(this.state.coID)

      this.props.history.push(`/coworkingSpace/${this.state.coID}`);

      return <div />;
    } else if (this.state.type === "member") {
      // console.log(this.state.coID)

      this.props.history.push(`/MemberProfile`);

      return <div />;
    } else if (this.state.type === "consultancyAgency") {
      // console.log(this.state.coID)

      this.props.history.push(`/consultancyAgency`);

      return <div />;
    } else if (this.state.type === "partner") {
      // console.log(this.state.coID)

      this.props.history.push(`/partner`);

      return <div />;
    } else if (this.state.type === "admin") {
      // console.log(this.state.coID)

      this.props.history.push(`/admin`);

      return <div />;
    }
  }
}

export default Login;
