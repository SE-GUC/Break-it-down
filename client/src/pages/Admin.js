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
 componentDidMount() {
    this.auth();
  }
 auth = async () => {
    await fetch(
      `/api/admin/viewAdmin`)
      .then(res => res.json())
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  };

  render() {
    return (
      <BrowserRouter>
      <div className="App" style={{ backgroundColor:  '#ffffff'}}>
      <AdminNavbar/>
      {/* <Side /> */}
      <img src={power} alt="You've got the power" style={{width: '100%'}} />
      </div>
      </BrowserRouter>
    );
  }
}

export default Admin;
