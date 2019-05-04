import React, { Component } from 'react';
import '../App.css';
import MainUpdates from '../components/MainUpdates'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, NavLink, BrowserRouter} from "react-router-dom";
import AdminSidenav from '../components/AdminSidenav'
import AdminNavbar from '../components/AdminNavbar'
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
    const img = require("../man.jpg");
    const divStyle = {
      width: "100%",
      height: "760px",
      backgroundImage: `url(${img})`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundSize: "100% 100%"
    };
    return (
      <BrowserRouter>
      <div className="App" style={divStyle}>
      <AdminNavbar/>
      {/* <Side /> */}
      </div>
      </BrowserRouter>
    );
  }
}

export default Admin;
