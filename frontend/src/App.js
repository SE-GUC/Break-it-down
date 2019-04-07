import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './App/pages/Home';


class App extends Component {



  render() {
    const App = () => (
      <div className='App'>
        <Router>
          <Route exact path='/coworkingSpace' component={Home}/>

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