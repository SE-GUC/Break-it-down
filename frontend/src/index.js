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
     <Route exact path="/" component={UserHomePage} />

    <Route exact path="/HomeTest" component={App}/>
    <Route exact path="/Tasks" component={TaskList}/>
    <Route exact path="/Events" component={EventList}/>
    <Route exact path="/viewCoworkingspace" component={viewcoWorkingSpace}/>
    <Route exact path="/specificCoworkingSpace/:id" component={specificCoworkingSpace}/>
     <Route exact path="/specificRoom/:Coid/:Roid" component={specificRoom}/>
       
    </BrowserRouter>

</Provider>
,
document.getElementById('root')



      


);


serviceWorker.unregister();
