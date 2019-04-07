import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import CreateRoom from './pages/CreateRoom';
import Update from "./pages/Update"


class App extends Component {



  render() {
    const App = () => (
      <div className='App'>
        <Router>
          <Route exact path='/coworkingSpace' component={Home}/>
          <Route exact path='/coworkingSpace/viewRoomSchedule/:coID/:rID' component={List}/>
          <Route exact path='/coworkingSpace/create/:coID' component={CreateRoom} />
          <Route exact path="/coworkingSpace/updateCospace/:coID" component={Update} />

        </Router>
      </div>
    )
    return (
      <Router>
        <App/>
      </Router>
    );
  }
}

export default App;