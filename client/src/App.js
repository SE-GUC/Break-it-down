import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomeCS";
import List from "./pages/List";
import CreateRoom from "./pages/CreateRoom";
import CreateSch from "./pages/Createsch";
import ViewRoom from "./pages/ViewRoom";
import AllRooms from "./pages/AllRooms";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import SignUpMember from "./pages/signUpMember";
import SignUpPartner from "./pages/signUpPartner";
import SignUpCoworkingSpace from "./pages/signUpCoworkingSpace";
import SignUpConsultancyAgency from "./pages/signUpConsultancyAgency";
import SignUpEducationalOrganization from "./pages/signUpEducationalOrganization";
import taskDescription from "./pages/taskDescription";
import MemberHomePage from "./pages/MemberHomePage";
import viewcoWorkingSpace from "./pages/viewCoworkingspace";
import specificCoworkingSpace from "./pages/specificCoworkingSpace";
import specificRoom from "./pages/specificRoom";
import MainUpdates from "./components/MainUpdates";
import Admin from "./pages/Admin";
import Suggestions from "./components/Suggestions";
import UpdateRoomBooking from "./components/UpdateRoomBooking";
import ViewRoomBookings from "./components/ViewRoomBookings";
import MemberProfile from "./pages/profileMember";
import ProfileCO from "./pages/profileCO";
import MemberMyRoomBooking from "./pages/MemberMyRoomBooking";
import MemberViewAllmembers from "./pages/MemberViewAllmembers";
import CAHome from "./pages/CAHome";
import CAPartners from "./components/CAPartners";
import consultancyAgencyStories from "./components/consultancyAgencyStories"
import CATasks from "./components/CATasks";
import EventList from './components/EventList'
import TaskList from './components/TaskList'
class App extends Component {
  render() {

    return (
         <Router>
           <div className="App"> 
          <Route exact path="/" component={Login} />

          <Route exact path="/MemberHomePage" component={MemberHomePage} />
          <Route exact path="/signup" component={SignUp} />

          <Route exact path="/signup/member" component={SignUpMember} />
          <Route exact path="/signup/partner" component={SignUpPartner} />
          <Route exact path="/signup/coworkingspace" component={SignUpCoworkingSpace}/>
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

          <Route exact path="/coworkingSpace" component={ProfileCO} />

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
            path="/checkTaskDescriptions/:PID/:TID"
            component={taskDescription}
          />

          <Route
            exact
            path="/coworkingSpace/viewRoom/:coID/:rID"
            component={ViewRoom}
          />

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
          <Route exact path="/AllMembersmem" component={MemberViewAllmembers} />
          <Route
            exact
            path="/RoombookingsMem/:id"
            component={MemberMyRoomBooking}
          />

          <Route exact path="/admin/updates" component={MainUpdates} />

          <Route exact path="/admin" component={Admin} />

          <Route exact path="/user/suggestions" component={Suggestions} />

          <Route
            exact
            path="/user/updateRoomBooking"
            component={UpdateRoomBooking}
          />

          <Route
            exact
            path="/user/viewRoomBooking"
            component={ViewRoomBookings}
          />
          <Route exact path="/MemberProfile" component={MemberProfile} />
          <Route exact path="/ConsultancyAgency" component={CAHome} />
          <Route exact path="/ConsultancyAgency/Partners" component={consultancyAgencyStories} />
        
          <Route exact path="/ConsultancyAgency/Tasks" component={CATasks} />
          <Route exact path="/Tasks" component={TaskList}/>
    <Route exact path="/Events" component={EventList}/>

    </div>
      </Router>
    );
  }
}

export default App;
