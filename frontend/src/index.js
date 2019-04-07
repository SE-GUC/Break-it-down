import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import viewall from './screens/viewAll'
import {Provider} from 'react-redux'
import EventList from './components/EventList'
import TaskList from './components/TaskList'

import store from './store'


import {
  Route,
  NavLink,
  BrowserRouter,
  Switch
} from "react-router-dom";

import * as serviceWorker from './serviceWorker';

ReactDOM.render(    
    <Provider store={store}>
    <BrowserRouter>
    <Switch>
    <Route exact path="/" component={App}/>
    <Route exact path="/Tasks" component={TaskList}/>
    <Route exact path="/Events" component={EventList}/>
    </Switch>
    </BrowserRouter>
</Provider>
,
document.getElementById('root')



      


);


serviceWorker.unregister();
