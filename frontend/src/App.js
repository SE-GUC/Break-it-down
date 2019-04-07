/*<MDBNavItem active>
              <MDBNavLink to={`./viewCoworkingSpace`}>Home</MDBNavLink>
            </MDBNavItem>*/

import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import UserHomePage from "./pages/UserHomePage";
import viewcoWorkingSpace from "./pages/viewCoworkingspace";
import specificCoworkingSpace from "./pages/specificCoworkingSpace";
import specificRoom from "./pages/specificRoom";
class App extends Component {
  render() {
    const App = () => (
      <div className="App">
        <Router>
          <Route exact path="/" component={UserHomePage} />
          <Route
            exact
            path="/viewCoworkingspace"
            component={viewcoWorkingSpace}
          />
          <Route
            exact
            path="/specificCoworkingSpace/:id"
            component={specificCoworkingSpace}
          />
          <Route
            exact
            path="/specificRoom/:Coid/:Roid"
            component={specificRoom}
          />
        </Router>
      </div>
    );
    return (
      <Router>
        <App />
      </Router>
    );
  }
}

export default App;
