import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "../App/pages/Home";
import lifeCycle from "../App/pages/lifeCycle";
import createTask from "../App/pages/createTask";
class App extends Component {
  render() {
    const App = () => (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/TaskLifeCycle/:PID/:TID" component={lifeCycle} />
            <Route exact path="/createTask/:id" component={createTask} />
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


