import React, { Component } from 'react';
import '../App.css';
import MainUpdates from '../components/MainUpdates'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, NavLink, BrowserRouter} from "react-router-dom";

class Admin extends Component {

  render() {
    return (
      <BrowserRouter>
      <div className="App" style={{ backgroundColor:  '#005a73'}}>
      <h1 style={{color:'#B5A642',textAlign:'center'}}>Welcome Dear Admin</h1>
      <ul className="header">
            <li><NavLink to="/admin/updates">MainUpdates</NavLink></li>
          </ul>
          <div className="content">
               <Route exact path="/admin/updates" component={MainUpdates}/>
          </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default Admin;
