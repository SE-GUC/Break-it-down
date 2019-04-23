import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
// import "semantic-ui/dist/semantic.min.css";
import "semantic-ui-css/semantic.min.css";
import List from "./pages/List";
import CreateRoom from "./pages/CreateRoom";
import CreateSch from "./pages/Createsch";
import ViewRoom from "./pages/ViewRoom";
import AllRooms from "./pages/AllRooms";
import Login from "./pages/login";
import taskDescription from "./pages/taskDescription";
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
import consultancyAgencyStories from "./components/consultancyAgencyStories";
import CATasks from "./components/CATasks";
import EventList from "./components/EventList";
import TaskList from "./components/TaskList";
import lifeCycle from "./pages/partnerlifeCycle";
import createTask from "./pages/partnercreateTask";
import partnerprofile from "./pages/partnerprofile";
import viewApplicants from "./pages/partnerviewApplicants";
import review from "./pages/partnerreview";
import reqChange from "./pages/partnerreqChange";
import viewConsultancies from "./pages/partnerviewConsultancies";
import viewProfile from "./pages/partnerviewProfile";
import myTasks from "./pages/partnermyTasks";
import myRoomBookings from "./pages/partnermyRoomBookings";
import schedule from "./pages/partnermyschedule";
import book from "./pages/partnerbook";
import deletebook from "./pages/partnerdeletebook";
import ViewSchedule from "./pages/cospaceScheduleV";
import partnerviewcoWorkingSpace from "./pages/partnerviewCoworkingspace";
import partneraccept from "./pages/partnerAcceptApplicant";
import partneracceptcons from "./pages/partnerAcceptCons";
import partnernotify from "./pages/partnerNotify";
import activateAccount from "./pages/AdminActivateAccounts";
import NotifyToSignContract from "./pages/AdminNotifyToSignContract";
import MemberProfileV from "./pages/memberProfileV";
import PartnerProfileV from "./pages/partnerProfileV";
import ViewAllPartners from "./pages/ViewAllPartners";
import ViewAllMembers from "./pages/ViewAllMembers";
import SpecificMember from "./pages/memberProfileV";
import SpecificPartner from "./pages/partnerProfileV";
import PartnerProfile from "./pages/partnerprofile";
import CaAllTasks from "./components/CAApplyForTask";
import CAEvents from "./components/CAMyEvents";
import ChangePass from "./pages/ChangePass";
import Notify from "./pages/AdminNotify";
import MemberTasks from "./pages/MemberTasks";
import MemberRecommendedTasks from "./pages/MemberRecommendedTasks";
import Memberdeletebook from "./pages/Memberdeletebook";
import Memberapplytasks from "./pages/Memberapplytasks";
import MemberStartTask from "./pages/MemberStartTask";
import MemberEndTask from "./pages/MemberEndTask";

class App extends Component {
  componentWillMount() {
    document.title = "Lirten Hub";
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />

          <Route exact path="/coworkingSpace/:coID" component={ProfileCO} />

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
          <Route exact path="/AllMembersmem" component={MemberViewAllmembers} />

          <Route
            exact
            path="/RoombookingsMem/"
            component={MemberMyRoomBooking}
          />
          <Route
            exact
            path="/RoomBookings/:bookingID"
            component={Memberdeletebook}
          />

          <Route exact path="/admin/updates" component={MainUpdates} />

          <Route exact path="/admin" component={Admin} />

          <Route exact path="/user/suggestions" component={Suggestions} />

          <Route
            exact
            path="/user/updateRoomBooking/:BID"
            component={UpdateRoomBooking}
          />

          <Route
            exact
            path="/user/viewRoomBooking"
            component={ViewRoomBookings}
          />
          <Route exact path="/MemberProfile" component={MemberProfile} />
          <Route exact path="/ConsultancyAgency" component={CAHome} />
          <Route
            exact
            path="/ConsultancyAgency/Partners"
            component={consultancyAgencyStories}
          />

          <Route exact path="/ConsultancyAgency/Tasks" component={CATasks} />
          <Route exact path="/Tasks" component={TaskList} />
          <Route exact path="/Events" component={EventList} />

          <Route exact path="/partner" component={partnerprofile} />
          <Route
            exact
            path="/myTasks/TaskLifeCycle/:TID"
            component={lifeCycle}
          />
          <Route exact path="/createTask" component={createTask} />
          <Route exact path="/myTasks/:TID" component={viewApplicants} />
          <Route exact path="/myTasks/ReviewandRate/:TID" component={review} />
          <Route
            exact
            path="/myTasks/viewConsultancy/:TID"
            component={viewConsultancies}
          />
          <Route
            exact
            path="/myTasks/RequestDescriptionChange/:TID"
            component={reqChange}
          />
          <Route exact path="/viewProfile" component={partnerprofile} />
          <Route exact path="/myProfile" component={viewProfile} />
          <Route exact path="/myTasks" component={myTasks} />
          <Route exact path="/roombookings" component={myRoomBookings} />
          <Route exact path="/cospace/rooms/:id/:id2" component={schedule} />
          <Route
            exact
            path="/RoomBookings/cospace/rooms/:id/:id2/:id3"
            component={book}
          />
          <Route exact path="/RoomBookings/:bookingID" component={deletebook} />
          <Route
            exact
            path="/coworkingSpace/viewRoomSchedulepublic/:coID/:rID"
            component={ViewSchedule}
          />
          <Route
            exact
            path="/partnerviewCoworkingspace"
            component={partnerviewcoWorkingSpace}
          />
          <Route
            exact
            path="/myTasks/AcceptApplicant/:idT/:idA"
            component={partneraccept}
          />
          <Route
            exact
            path="/myTasks/ChooseConsultancyAgency/:idT/:idA"
            component={partneracceptcons}
          />
          <Route exact path="/getNotifications" component={partnernotify} />
          <Route exact path="/admin/mails" component={NotifyToSignContract} />
          <Route exact path="/admin/notifications" component={Notify} />
          <Route exact path="/admin/activate" component={activateAccount} />
          <Route
            exact
            path="/admin/taskDescription"
            component={taskDescription}
          />
          <Route exact path="/viewMembermem/:mID" component={MemberProfileV} />

          <Route
            exact
            path="/viewPartnerProfile/:pID"
            component={PartnerProfileV}
          />

          <Route exact path="/ViewAllPartners" component={ViewAllPartners} />

          <Route exact path="/ViewAllMembers" component={ViewAllMembers} />

          <Route exact path="/specificMember/:mID" component={SpecificMember} />

          <Route
            exact
            path="/specificPartner/:pID"
            component={SpecificPartner}
          />

          <Route exact path="/partnerprofile" component={PartnerProfile} />

          <Route
            exact
            path="/ConsultancyAgency/AllTasks"
            component={CaAllTasks}
          />

          <Route
            exact
            path="/ConsultancyAgency/MyEvents"
            component={CAEvents}
          />

          <Route exach path="/changePassword" component={ChangePass} />
          <Route exact path="/MemberTasks" component={MemberTasks} />
          <Route
            exact
            path="/MemberRecommendedTasks/"
            component={MemberRecommendedTasks}
          />
          <Route
            exact
            path="/MemberStartTask/:taskID"
            component={MemberStartTask}
          />
          <Route
            exact
            path="/MemberEndTask/:taskID"
            component={MemberEndTask}
          />
        </div>
      </Router>
    );
  }
}

export default App;
