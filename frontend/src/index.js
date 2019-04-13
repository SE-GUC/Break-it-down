import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import {
    Route,
    BrowserRouter,
    
  } from "react-router-dom";
  import {Provider} from 'react-redux'
  import EventList from './components/EventList'
  import TaskList from './components/TaskList'
  import store from './store'


ReactDOM.render(    <Provider store={store}>
    <BrowserRouter>
    <Route exact path="/Tasks" component={TaskList}/>
    <Route exact path="/Events" component={EventList}/>


    </BrowserRouter>
    <App/>

</Provider>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
