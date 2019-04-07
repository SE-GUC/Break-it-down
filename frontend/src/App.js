import React, { Component } from 'react';
import './App.css';
import Admin from './pages/Admin'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, NavLink, BrowserRouter} from "react-router-dom";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div className="App" style={{ backgroundColor:  '#005a73'}}>
      <h1 style={{color:'#B5A642',textAlign:'center'}}>Hey there ! Select the user page you want to navigate to.</h1>
      <ul className="header">
            <li><NavLink to="/admin">Admin</NavLink></li>
          </ul>
          <div className="content">
               <Route exact path="/admin" component={Admin}/>
          </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
