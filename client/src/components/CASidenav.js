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
import { slide as Menu } from 'react-burger-menu';
import {plusSquare} from 'react-icons-kit/fa/plusSquare'
import {calendar} from 'react-icons-kit/icomoon/calendar'


export default class CASidenav extends Component {
  render() {
  return ( 
    <Menu>

      <a className="menu-item" href={`/ConsultancyAgency`}>
      <SvgIcon size={20} icon={home} />{"  "}

        My Profile
      </a>

      <a className="menu-item" href={`/ConsultancyAgency/Partners`}>
      <SvgIcon size={20} icon={users} />{"  "}

       My Partners
      </a>

      <a className="menu-item" href={`/ConsultancyAgency/Tasks`}>
      <SvgIcon size={20} icon={clipboard} /> {"  "}

       My Assigned Tasks
      </a>

      <a className="menu-item" href={`/ConsultancyAgency/MyEvents`}>
      <SvgIcon size={20} icon={calendar} />{"  "}

        My Events
      </a>

      <a className="menu-item" href={`/ConsultancyAgency/AllTasks`}>
      <SvgIcon size={20} icon={plusSquare} />{"  "}

        Apply for a Task
      </a>
    </Menu>
  );
};
}

