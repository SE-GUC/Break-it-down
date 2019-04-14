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
import {users} from 'react-icons-kit/icomoon/users'
import { home } from "react-icons-kit/icomoon/home";
import {clipboard} from 'react-icons-kit/icomoon/clipboard'

export default class CASidenav extends Component {
  render() {
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
                  <NavItem eventKey="ConsultancyAgency">
                    <NavIcon>
                      <SvgIcon size={20} icon={home} />
                    </NavIcon>
                    <NavText>Home</NavText>
                  </NavItem>

                  <NavItem eventKey="ConsultancyAgency/Partners">
                    <NavIcon>
                      <SvgIcon size={20} icon={users} />
                    </NavIcon>
                    <NavText>My Partners</NavText>
                  </NavItem>

                  <NavItem eventKey="ConsultancyAgency/Tasks">
                    <NavIcon>
                      <SvgIcon size={20} icon={clipboard} />
                    </NavIcon>
                    <NavText>My Assigned Tasks</NavText>
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
