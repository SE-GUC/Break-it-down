import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideNav, {
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SvgIcon from "react-icons-kit";
import { calendar } from "react-icons-kit/icomoon/calendar";
import { home } from "react-icons-kit/icomoon/home";
import { manWoman } from "react-icons-kit/icomoon/manWoman";
export default class MemberSidenav extends Component {
  state = {
    MID: "5ca00f9a1c9d4400009a80cf"
  };
  render() {
    const MID = this.state.MID;
    return (
      <Router>
        <Route
          render={({ location, history }) => (
            <React.Fragment>
              <SideNav
                style={{ backgroundColor: "#005a73" }}
                onSelect={selected => {
                  const to = "/" + selected;
                  window.location = to;
                }}
              >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                  <NavItem eventKey="homepage">
                    <NavIcon>
                      <SvgIcon size={20} icon={home} />
                    </NavIcon>
                    <NavText>Home</NavText>
                  </NavItem>

                  <NavItem eventKey={`RoombookingsMem/${MID}`}>
                    <NavIcon>
                      <SvgIcon size={20} icon={calendar} />
                    </NavIcon>
                    <NavText>My Room Booking</NavText>
                  </NavItem>

                  <NavItem eventKey="AllMembersmem">
                    <NavIcon>
                      <SvgIcon size={20} icon={manWoman} />
                    </NavIcon>
                    <NavText>View all members</NavText>
                  </NavItem>
                </SideNav.Nav>
              </SideNav>
              <main />
            </React.Fragment>
          )}
        />
      </Router>
    );
  }
}
