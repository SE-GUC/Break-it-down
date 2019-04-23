import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideNav,{Nav,NavItem,NavIcon, NavText} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SvgIcon from "react-icons-kit";
import { key } from "react-icons-kit/icomoon/key";
import { home } from "react-icons-kit/icomoon/home";

export default class AdminSidenav extends Component {
  render() {
    return (
      <Router>
        <Route
          render={({ location, history }) => (
            <React.Fragment>
              <SideNav
                style={{ backgroundColor: "#ffffff" }}
                onSelect={selected => {
                  const to = "/" + selected;
                  window.location = to;
                }}
              >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                  <NavItem eventKey="admin">
                    <NavIcon>
                      <SvgIcon size={20} style={{color: '#000000'}} icon={home} />
                    </NavIcon>
                    <NavText>Home</NavText>
                  </NavItem>

                  <NavItem eventKey="admin/updates">
                    <NavIcon>
                      <SvgIcon size={20} icon={key} style={{color: '#000000'}}/>
                    </NavIcon>
                    <NavText>View user updates</NavText>
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

