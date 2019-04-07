import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import List from "./pages/List";
import CreateRoom from "./pages/CreateRoom";
import Update from "./pages/Update";
import CreateSch from "./pages/Createsch";
import ViewRoom from "./pages/ViewRoom";
import AllRooms from "./pages/AllRooms";
import ViewInfo from "./pages/Cospaceinfo";
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

          <Route exact path="/coworkingSpace" component={Home} />
          <Route
            exact
            path="/coworkingSpace/viewRoomSchedule/:coID/:rID"
            component={List}
          />
          <Route
            exact
            path="/coworkingSpace/create/:coID"
            component={CreateRoom}
          />
          <Route
            exact
            path="/coworkingSpace/updateCospace/:coID"
            component={Update}
          />
          <Route
            exact
            path="/coworkingSpace/viewInfo/:coID"
            component={ViewInfo}
          />
          <Route
            exact
            path="/coworkingSpace/createSchedule/:coID/:rID"
            component={CreateSch}
          />
          <Route
            exact
            path="/coworkingSpace/viewAllRooms/:coID"
            component={AllRooms}
          />
          <Route
            exact
            path="/coworkingSpace/viewRoom/:coID/:rID"
            component={ViewRoom}
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
