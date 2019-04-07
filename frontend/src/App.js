import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import SignUpMember from "./pages/signUpMember";
import SignUpPartner from "./pages/signUpPartner";
import SignUpCoworkingSpace from "./pages/signUpCoworkingSpace";
import SignUpConsultancyAgency from "./pages/signUpConsultancyAgency";
import SignUpEducationalOrganization from "./pages/signUpEducationalOrganization";

class App extends Component {
  render() {
    const App = () => (
      <div className="App">
        <Router>
          <Route exact path="/" component={Login} />

          <Route exact path="/signup" component={SignUp} />

          <Route exact path="/signup/member" component={SignUpMember} />
          <Route exact path="/signup/partner" component={SignUpPartner} />
          <Route
            exact
            path="/signup/coworkingspace"
            component={SignUpCoworkingSpace}
          />
          <Route
            exact
            path="/signup/consultancyagency"
            component={SignUpConsultancyAgency}
          />
          <Route
            exact
            path="/signup/educationalorganization"
            component={SignUpEducationalOrganization}
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
