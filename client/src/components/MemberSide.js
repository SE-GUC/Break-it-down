import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
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
import store from "store";

export default props => {
  return (
    <Menu>
      <Router>
        <Route
          render={({ location, history }) => (
            <React.Fragment>
              <a className="menu-item" href={`/memberprofile`}>
                Home
              </a>
              <br />
              <a className="menu-item" href={`/RoombookingsMem`}>
                My Room Booking
              </a>
              <br />
              <a className="menu-item" href={`/AllMembersmem`}>
                View all members
                <SvgIcon size={20} icon={manWoman} />
              </a>
              <br />
              <a className="menu-item" href={`/MemberTasks`}>
                View available tasks
              </a>
              <br />
              <a className="menu-item" href={`/MemberRecommendedTasks`}>
                View recommended tasks
              </a>
              <br />
              <a className="menu-item" href={`/viewCoworkingSpace`}>
                View cospaces
              </a>
            </React.Fragment>
          )}
        />
      </Router>
    </Menu>
  );
};
