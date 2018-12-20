import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import { userStore } from "./stores/userStore";
import { movieStore } from "./stores/movieStore";
import { Provider } from "mobx-react";
// import "@babel/polyfill"; for ie11
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.scss";

ReactDOM.render(
  <Provider userStore={userStore} movieStore={movieStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
