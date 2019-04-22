import React, { Component } from 'react';
import '../App.css';
import MainUpdates from '../components/MainUpdates'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, NavLink, BrowserRouter} from "react-router-dom";
import AdminSidenav from '../components/AdminSidenav'
import AdminNavbar from '../components/AdminNavbar'
import power from '../power.png';
// import Side from "../components/BasicSideNavBar";

class Admin extends Component {

  render() {
    return (
      <BrowserRouter>
      <div className="App" style={{ backgroundColor:  '#b1b1b1'}}>
      <AdminNavbar/>
      {/* <Side /> */}
      <img src={power} alt="You've got the power" style={{width: '100%'}} />
      </div>
      </BrowserRouter>
    );
  }
}

export default Admin;
