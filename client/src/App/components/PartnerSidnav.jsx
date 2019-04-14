import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideNav, {
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Link } from "react-router-dom";
import SvgIcon from "react-icons-kit";
import { calendar } from "react-icons-kit/icomoon/calendar";
import { home } from "react-icons-kit/icomoon/home";
import {userTie} from 'react-icons-kit/icomoon/userTie';
import {upload2} from 'react-icons-kit/icomoon/upload2';
import {folderOpen} from 'react-icons-kit/icomoon/folderOpen'

export default class PartnerSidenav extends Component {
  state = {
    PID: "5c9114781c9d440000a926ce",
    id:"5c9114781c9d440000a926ce",
    userID:"5c9114781c9d440000a926ce"
  };
  render() {
    const PID = this.state.PID;
    const id = this.state.id;
    const userID = this.state.userID;
    return (
      <Router>
        <Route
          render={({ location, history }) => (
            <React.Fragment>
              <SideNav
                style={{backgroundColor:"#bcc0da"}}
                onSelect={selected => {
                  const to = "/" + selected;
                  window.location = to;
                }}
              >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                  <NavItem eventKey="">
                    <NavIcon>
                      <SvgIcon size={20} icon={home} />
                    </NavIcon>
                    <NavText>Home</NavText>

                  </NavItem>
                                    
                  <NavItem eventKey={`viewProfile/${PID}`}>
                    <NavIcon>
                      <SvgIcon size={20} icon={userTie} />
                    </NavIcon>
                    <NavText> Your profile </NavText>

                  </NavItem>
                 

                  
                  <NavItem eventKey={`createTask/${id}`}>
                    <NavIcon>
                      <SvgIcon size={20} icon={upload2} />
                    </NavIcon>
                    <NavText>Create a task </NavText>

                  </NavItem>

                  <NavItem eventKey={`myTasks/${PID}`}>
                    <NavIcon>
                      <SvgIcon size={20} icon={folderOpen} />
                    </NavIcon>
                    <NavText> Tasks </NavText>

                  </NavItem>

                  <NavItem eventKey={`roombookings/${userID}`}>
                    <NavIcon>
                      <SvgIcon size={20} icon={calendar} />
                    </NavIcon>
                    <NavText>My Room Booking</NavText>
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


