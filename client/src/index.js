import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import store from "./store";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
// import "semantic-ui/dist/semantic.min.css";
import 'semantic-ui-css/semantic.min.css'
import { Provider } from "react-redux";
render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
