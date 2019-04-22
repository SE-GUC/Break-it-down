import React, { Component } from 'react';
import { scaleRotate as Menu } from 'react-burger-menu';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SvgIcon from "react-icons-kit";
import { home } from "react-icons-kit/icomoon/home";
import BellIcon from "react-bell-icon";
import { Icon } from "semantic-ui-react";
import {key} from "react-icons-kit/icomoon/key";
import {envelope} from 'react-icons-kit/fa/envelopeO';
import Search from "../components/Search";

  class Adminside extends Component{
    logout = async e => {
      e.preventDefault();
      //const coID = this.props.match.params.coID;
      await fetch(`/api/CreateAccount/logout`).then(res => res.json());
    };
    render(){
      return (
        <div>
        <Menu style={{
          position: 'fixed',
          width: '36px',
          height: '30px',
          right: '36px',
          top: '36px'
        }} right>
        <Search />
          <a className="menu-item" href="/admin">
          <Icon name="home" />
            Home
          </a>
          <a className="menu-item" href="/admin/updates">
          <Icon name="key" />
          View user updates
          </a>
          <a className="menu-item" href="/admin/mails">
          <Icon name="envelope" />
          Mail Users to Sign Lirten Hub's Contract
          </a>
          <a className="menu-item" href="/admin/notifications">
          <BellIcon width="40" active={true} animate={true} />
          Notifications
          </a>
          <a className="menu-item" href="/admin/activate">
          Activate
          </a>
          <a className="menu-item" href="/admin/taskDescription">
          Task Descriptions
          </a>
          <a className="menu-item"onClick={e => {this.logout(e); window.location = "/"; }} >  
          Logout{" "}</a>
    
        </Menu>
        </div>
      );
    };

  }
export default Adminside;