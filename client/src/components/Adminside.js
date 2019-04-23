import React, { Component } from 'react';
import { scaleRotate as Menu } from 'react-burger-menu';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SvgIcon from "react-icons-kit";
import { home } from "react-icons-kit/icomoon/home";
import BellIcon from "react-bell-icon";
import { Icon } from "semantic-ui-react";
import {key} from "react-icons-kit/icomoon/key";
import {envelope} from 'react-icons-kit/fa/envelopeO';
import {logout} from 'react-icons-kit/iconic/logout'
import {pencil} from 'react-icons-kit/fa/pencilSquareO';
import {users} from 'react-icons-kit/fa/users'

  class Adminside extends Component{
    logout = async e => {
      e.preventDefault();
      //const coID = this.props.match.params.coID;
      await fetch(`/api/CreateAccount/logout`).then(res => res.json());
    };
    render(){
      return (
        <div>
        <Menu  right>
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
          <Icon name="users" /> 
          Activate Users' Accounts
          </a>
          <a className="menu-item" href="/admin/taskDescription">
          <Icon name="pencil" /> 
          Check Task Descriptions
          </a>
          <a className="menu-item"onClick={e => {this.logout(e); window.location = "/"; }} >  
          <Icon name="logout" /> 
          Logout{" "}</a>
    
        </Menu>
        </div>
      );
    };

  }
export default Adminside;
