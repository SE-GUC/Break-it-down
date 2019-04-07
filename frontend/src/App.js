import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Provider} from 'react-redux'
import store from './store'

class App extends Component {
  render() {

    return (
      <Provider store={store}>
      <div className="App">
        <header className="App-header">

            <h1>Welcome to LirtenHub :)</h1>
            <p>Please <a>Login</a> <br></br>
            or 
            <br></br>
            <a>Register</a>
          </p>
        </header>
      </div>
      </Provider>
    );
  }
}

export default App;
