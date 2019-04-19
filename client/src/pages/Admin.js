import React, { Component } from 'react';
import '../App.css';
import MainUpdates from '../components/MainUpdates'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, NavLink, BrowserRouter} from "react-router-dom";
import AdminSidenav from '../components/AdminSidenav'
import AdminNavbar from '../components/AdminNavbar'

class Admin extends Component {

  render() {
    return (
      <BrowserRouter>
      <div className="App" style={{ backgroundColor:  '#FFFFEB'}}>
      <AdminSidenav/>
      <AdminNavbar/>
      <h1 style={{color:'#005a73',textAlign:'center'}}>Welcome Dear Admin</h1>
      </div>
      </BrowserRouter>
    );
  }
}

export default Admin;
