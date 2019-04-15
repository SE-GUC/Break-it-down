import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "../App/pages/partnerHome";
import lifeCycle from "../App/pages/partnerlifeCycle";
import createTask from "../App/pages/partnercreateTask";
import success from "../App/pages/Success";
import viewApplicants from "../App/pages/partnerviewApplicants";
import review from "../App/pages/partnerreview";
import reqChange from "../App/pages/partnerreqChange";
import viewConsultancies from "../App/pages/partnerviewConsultancies";
import viewProfile from "../App/pages/partnerviewProfile";
import myTasks from "../App/pages/partnermyTasks";
import myRoomBookings from "../App/pages/partnermyRoomBookings";
import vision from "../App/pages/partnervision";
import schedule from "../App/pages/partnermyschedule";
import book from "../App/pages/partnerbook";
import deletebook from "../App/pages/partnerdeletebook";

class App extends Component {
  render() {
    const App = () => (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/TaskLifeCycle/:PID/:TID" component={lifeCycle} />
            <Route exact path="/createTask/:PID" component={createTask} />
            <Route exact path="/App/pages/Success" component={success} />
            <Route exact path="/view/:PID/:TID" component={viewApplicants} />
            <Route exact path="/ReviewandRate/:PID/:TID" component={review} />
            <Route exact path="/viewConsultancy/:PID/:TID" component={viewConsultancies} />
            <Route exact path="/RequestDescriptionChange/:PID/:TID" component={reqChange} />
            <Route exact path="/viewProfile/:PID" component={viewProfile} />
            <Route exact path="/App/pages/vision" component={vision} />
            <Route exact path="/myTasks/:PID" component={myTasks} />
            <Route exact path="/roombookings/:userID" component={myRoomBookings} />
            <Route exact path="/cospace/rooms/:id/:id2" component={schedule} />
            <Route exact path="/cospace/rooms/:userID/:id/:id2/:id3" component={book} />
            <Route exact path="/RoomBookings/:userID/:bookingID" component={deletebook} />

      </Switch>
        </BrowserRouter>
      </div>
    );
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;


