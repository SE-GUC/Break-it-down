// import React from 'react';
import { bubble as Menu } from "react-burger-menu";
import Search from "../components/Search";
import AdminNavbar from "../components/AdminNavbar";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import BellIcon from "react-bell-icon";
import { Icon, Modal } from "semantic-ui-react";
import About from "../components/About";
import ContactUs from "../components/ContactUs";

// export default props => {
// return (
//     <div>

//   <Menu>
//   <Search />
//     <a className="menu-item" href="">
//       News Feed
//     </a>

//     <a className="menu-item" href="/">
//       My profile
//     </a>
//     <a className="menu-item" href="">
//          Change password  </a>

//     <a className="menu-item" href="">
//          Logout  </a>

//   </Menu>
//   </div>
// );
// };

import React, { Component } from "react";

class BasicSideNavBar extends Component {
  state = { type: null, coID: null, data: null };

  componentDidMount() {
    this.getList();
  }
  // Retrieves the list of items from the Express app
  getList = async () => {
    //const coID = this.props.match.params.coID;
    await fetch(`/api/member/getUserData/`)
      .then(res => res.json())
      .then(data => {
        this.setState({ data });
        console.log(data);
      });

    this.setState({
      type: this.state.data.type,
      coID: this.state.data.id
    });
    // console.log(this.state.data.id);
    // console.log(this.state.data.type); /api/CreateAccount
  };

  logout = async e => {
    e.preventDefault();
    //const coID = this.props.match.params.coID;
    await fetch(`/api/CreateAccount/logout`).then(res => res.json());
  };
  render() {
    // const type = this.state.data.type;
    const coID = this.state.coID;

    // console.log(coID + " " + this.state.type);
    if (this.state.type === "coworkingSpace") {
      var styles = {
        bmBurgerButton: {
          position: "fixed",
          width: "36px",
          height: "30px",
          left: "36px",
          top: "36px"
        },
        bmBurgerBars: {
          background: "#373a47"
        },
        bmBurgerBarsHover: {
          background: "#a90000"
        },
        bmCrossButton: {
          height: "24px",
          width: "24px"
        },
        bmCross: {
          background: "black"
        },
        bmMenuWrap: {
          position: "fixed",
          height: "100%"
        },
        bmMenu: {
          background: "black",
          padding: "2.5em 1.5em 0",
          fontSize: "1.15em"
        },
        bmMorphShape: {
          fill: "black"
        },
        bmItemList: {
          color: "black",
          padding: "0em"
        },
        bmItem: {
          display: "inline-block"
        },
        bmOverlay: {
          background: "rgba(0, 0, 0, 0.3)"
        }
      };
      return (
        <div>
          <Menu styles={styles} disableAutoFocus>
            <Search />
            <br />
            <br />
            <br />
            <a className="menu-item" href={`/coworkingSpace/${coID}`}>
              <h3>
                <Icon name="user outline" size="large" /> My Profile
              </h3>
            </a>
            <br />
            <a>
              <Modal
                style={{
                  position: "absolute",

                  left: "50%",

                  top: "50%",

                  transform: "translate(-50%, -50%)"
                }}
                trigger={
                  <div>
                    <h3>
                      <Icon name="info circle" size="large" />
                      About
                    </h3>
                  </div>
                }
                basic
                size="large"
              >
                <Modal.Content>
                  <About />
                </Modal.Content>
              </Modal>
            </a>
            <br />

            <a>
              <Modal
                style={{
                  position: "absolute",

                  left: "50%",

                  top: "50%",

                  transform: "translate(-50%, -50%)"
                }}
                trigger={
                  <div>
                    <h3>
                      {" "}
                      <Icon name="mail" size="large" /> Contact Us
                    </h3>
                  </div>
                }
                basic
                size="large"
              >
                <Modal.Content>
                  <ContactUs />
                </Modal.Content>
              </Modal>
            </a>
            <br />

            <a
              onClick={e => {
                this.logout(e);
                window.location = "/";
              }}
            >
              <h3>
                <Icon name="sign-out" size="large" /> Logout
              </h3>
            </a>
          </Menu>
        </div>
      );
    } else if (this.state.type === "partner") {
      var styles = {
        bmBurgerButton: {
          position: "fixed",
          width: "36px",
          height: "30px",
          left: "36px",
          top: "36px"
        },
        bmBurgerBars: {
          background: "#373a47"
        },
        bmBurgerBarsHover: {
          background: "#a90000"
        },
        bmCrossButton: {
          height: "24px",
          width: "24px"
        },
        bmCross: {
          background: "black"
        },
        bmMenuWrap: {
          position: "fixed",
          height: "100%"
        },
        bmMenu: {
          background: "black",
          padding: "2.5em 1.5em 0",
          fontSize: "1.15em"
        },
        bmMorphShape: {
          fill: "black"
        },
        bmItemList: {
          color: "black",
          padding: "0em"
        },
        bmItem: {
          display: "inline-block"
        },
        bmOverlay: {
          background: "rgba(0, 0, 0, 0.3)"
        }
      };
      return (
        <div>
          <Menu styles={styles} disableAutoFocus>
            <Search />
            <br />
            <br />
            <br />
            <a className="menu-item" href="/partner">
              <h3>
                <Icon name="user outline" size="large" /> My Profile
              </h3>
            </a>
            <br />
            <a className="menu-item" href={`/myProfile`}>
              <h3>
                <Icon name="book" size="large" /> My Data
              </h3>
            </a>
            <br />
            <a className="menu-item" href={`/createTask`}>
              <h3>
                <Icon name="plus circle" size="large" />
                Create a Task{" "}
              </h3>
            </a>
            <br />
            <a className="menu-item" href={`/myTasks`}>
              <h3>
                <Icon name="tasks" size="large" />
                My Tasks
              </h3>
            </a>
            <br />
            <a className="menu-item" href={`/roombookings`}>
              <h3>
                <Icon name="list" size="large" />
                My Room Bookings
              </h3>
            </a>
            <br />
            <a className="menu-item" href={`./partnerviewCoworkingSpace`}>
              <h3>
                <Icon name="calendar plus" size="large" />
                Book A Room
              </h3>
            </a>
            <br />
            <a className="menu-item" href={`/getNotifications`}>
              <h3>
                <BellIcon width="40" active={true} animate={true} />
                Notifications
              </h3>
            </a>
            <br />
            <a>
              <Modal
                style={{
                  position: "absolute",

                  left: "50%",

                  top: "50%",

                  transform: "translate(-50%, -50%)"
                }}
                trigger={
                  <div>
                    <h3>
                      <Icon name="info circle" size="large" />
                      About
                    </h3>
                  </div>
                }
                basic
                size="large"
              >
                <Modal.Content>
                  <About />
                </Modal.Content>
              </Modal>
            </a>
            <br />

            <a>
              <Modal
                style={{
                  position: "absolute",

                  left: "50%",

                  top: "50%",

                  transform: "translate(-50%, -50%)"
                }}
                trigger={
                  <div>
                    <h3>
                      {" "}
                      <Icon name="mail" size="large" /> Contact Us
                    </h3>
                  </div>
                }
                basic
                size="large"
              >
                <Modal.Content>
                  <ContactUs />
                </Modal.Content>
              </Modal>
            </a>
            <br />

            <a
              onClick={e => {
                this.logout(e);
                window.location = "/";
              }}
            >
              <h3>
                <Icon name="sign-out" size="large" /> Logout
              </h3>
            </a>
          </Menu>
        </div>
      );
    } else if (this.state.type === "consultancyAgency") {
      var styles = {
        bmBurgerButton: {
          position: "fixed",
          width: "36px",
          height: "30px",
          left: "36px",
          top: "36px"
        },
        bmBurgerBars: {
          background: "#373a47"
        },
        bmBurgerBarsHover: {
          background: "#a90000"
        },
        bmCrossButton: {
          height: "24px",
          width: "24px"
        },
        bmCross: {
          background: "black"
        },
        bmMenuWrap: {
          position: "fixed",
          height: "100%"
        },
        bmMenu: {
          background: "black",
          padding: "2.5em 1.5em 0",
          fontSize: "1.15em"
        },
        bmMorphShape: {
          fill: "black"
        },
        bmItemList: {
          color: "black",
          padding: "0em"
        },
        bmItem: {
          display: "inline-block"
        },
        bmOverlay: {
          background: "rgba(0, 0, 0, 0.3)"
        }
      };
      return (
        <Menu styles={styles} disableAutoFocus>
          <Search />
          <br />
          <br />
          <br />
          <a href={`/ConsultancyAgency`} left>
            <h3>
              <Icon name="user outline" size="large" /> My Profile
            </h3>
          </a>
          <br />

          <a href={`/ConsultancyAgency/Partners`}>
            <h3>
              <Icon name="users" size="large" /> My Partners
            </h3>
          </a>
          <br />

          <a href={`/ConsultancyAgency/Tasks`}>
            <h3>
              {" "}
              <Icon size="large" name="tasks" /> My Assigned Tasks
            </h3>
          </a>
          <br />

          <a href={`/ConsultancyAgency/MyEvents`}>
            <h3>
              {" "}
              <Icon size="large" name="calendar alternate outline" /> My Events
            </h3>
          </a>
          <br />

          <a href={`/ConsultancyAgency/AllTasks`}>
            <h3>
              <Icon size="large" name="add" /> Apply for a Task
            </h3>
          </a>
          <br />

          <a>
            <Modal
              style={{
                position: "absolute",

                left: "50%",

                top: "50%",

                transform: "translate(-50%, -50%)"
              }}
              trigger={
                <div>
                  <h3>
                    <Icon name="info circle" size="large" />
                    About
                  </h3>
                </div>
              }
              basic
              size="large"
            >
              <Modal.Content>
                <About />
              </Modal.Content>
            </Modal>
          </a>
          <br />

          <a>
            <Modal
              style={{
                position: "absolute",

                left: "50%",

                top: "50%",

                transform: "translate(-50%, -50%)"
              }}
              trigger={
                <div>
                  <h3>
                    {" "}
                    <Icon name="mail" size="large" /> Contact Us
                  </h3>
                </div>
              }
              basic
              size="large"
            >
              <Modal.Content>
                <ContactUs />
              </Modal.Content>
            </Modal>
          </a>
          <br />

          <a
            onClick={e => {
              this.logout(e);
              window.location = "/";
            }}
          >
            <h3>
              <Icon name="sign-out" size="large" /> Logout
            </h3>
          </a>
        </Menu>
      );
    } else if (this.state.type === "admin") {
      return <AdminNavbar />;
    } else if (this.state.type === "member") {
      var styles = {
        bmBurgerButton: {
          position: "fixed",
          width: "36px",
          height: "30px",
          left: "36px",
          top: "36px"
        },
        bmBurgerBars: {
          background: "#373a47"
        },
        bmBurgerBarsHover: {
          background: "#a90000"
        },
        bmCrossButton: {
          height: "24px",
          width: "24px"
        },
        bmCross: {
          background: "black"
        },
        bmMenuWrap: {
          position: "fixed",
          height: "100%"
        },
        bmMenu: {
          background: "black",
          padding: "2.5em 1.5em 0",
          fontSize: "1.15em"
        },
        bmMorphShape: {
          fill: "black"
        },
        bmItemList: {
          color: "black",
          padding: "0em"
        },
        bmItem: {
          display: "inline-block"
        },
        bmOverlay: {
          background: "rgba(0, 0, 0, 0.3)"
        }
      };
      return (
        <div>
          <Menu styles={styles} disableAutoFocus>
            <Search />
            <br />
            <br />
            <br />
            <a className="menu-item" href="/MemberProfile">
              <h3>
                <Icon name="user outline" size="large" /> My Profile
              </h3>
            </a>
            <br />
            <a className="menu-item" href={`/roombookings`}>
              <h3>
                <Icon name="list" size="large" />
                My Room Bookings
              </h3>
            </a>
            <br />
            <a className="menu-item" href={`./partnerviewCoworkingSpace`}>
              <h3>
                <Icon name="calendar plus" size="large" />
                Book A Room
              </h3>
            </a>
            <br />

            <a>
              <Modal
                style={{
                  position: "absolute",

                  left: "50%",

                  top: "50%",

                  transform: "translate(-50%, -50%)"
                }}
                trigger={
                  <div>
                    <h3>
                      <Icon name="info circle" size="large" />
                      About
                    </h3>
                  </div>
                }
                basic
                size="large"
              >
                <Modal.Content>
                  <About />
                </Modal.Content>
              </Modal>
            </a>
            <br />

            <a>
              <Modal
                style={{
                  position: "absolute",

                  left: "50%",

                  top: "50%",

                  transform: "translate(-50%, -50%)"
                }}
                trigger={
                  <div>
                    <h3>
                      {" "}
                      <Icon name="mail" size="large" /> Contact Us
                    </h3>
                  </div>
                }
                basic
                size="large"
              >
                <Modal.Content>
                  <ContactUs />
                </Modal.Content>
              </Modal>
            </a>
            <br />

            <a
              onClick={e => {
                this.logout(e);
                window.location = "/";
              }}
            >
              <h3>
                <Icon name="sign-out" size="large" /> Logout
              </h3>
            </a>
          </Menu>
        </div>
      );
    } else {
      var styles = {
        bmBurgerButton: {
          position: "fixed",
          width: "36px",
          height: "30px",
          left: "36px",
          top: "36px"
        },
        bmBurgerBars: {
          background: "#373a47"
        },
        bmBurgerBarsHover: {
          background: "#a90000"
        },
        bmCrossButton: {
          height: "24px",
          width: "24px"
        },
        bmCross: {
          background: "black"
        },
        bmMenuWrap: {
          position: "fixed",
          height: "100%"
        },
        bmMenu: {
          background: "black",
          padding: "0",
          fontSize: "1.15em"
        },
        bmMorphShape: {
          fill: "black"
        },
        bmItemList: {
          color: "black",
          padding: "0.8em"
        },
        bmItem: {
          display: "inline-block"
        },
        bmOverlay: {
          background: "rgba(0, 0, 0, 0.3)"
        }
      };
      return (
        <Menu styles={styles} disableAutoFocus>
          <a href={`/`}>
            <Icon name="home" size="massive" />
            <br />
            <h1>Home</h1>
          </a>

          <a>
            <Modal
              style={{
                position: "absolute",

                left: "50%",

                top: "50%",

                transform: "translate(-50%, -50%)"
              }}
              trigger={
                <div>
                  <Icon name="info circle" size="massive" />
                  <br />
                  <h1>About</h1>
                </div>
              }
              basic
              size="large"
            >
              <Modal.Content>
                <About />
              </Modal.Content>
            </Modal>
          </a>

          <a>
            <Modal
              style={{
                position: "absolute",

                left: "50%",

                top: "50%",

                transform: "translate(-50%, -50%)"
              }}
              trigger={
                <div>
                  <Icon name="mail" size="massive" />
                  <br />
                  <h1>Contact Us</h1>
                </div>
              }
              basic
              size="large"
            >
              <Modal.Content>
                <ContactUs />
              </Modal.Content>
            </Modal>
          </a>
        </Menu>
      );
    }
  }
}

export default BasicSideNavBar;
