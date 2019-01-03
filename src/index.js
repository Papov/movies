import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import { userStore } from "./stores/userStore";
import { moviesStore } from "./stores/moviesStore";
import { loginFormStore } from "./stores/loginFormStore";
import { movieDetailStore } from "./stores/movieDetailStore";
import { Provider } from "mobx-react";
// import "@babel/polyfill"; for ie11
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.scss";

ReactDOM.render(
  <Provider
    userStore={userStore}
    moviesStore={moviesStore}
    loginFormStore={loginFormStore}
    movieDetailStore={movieDetailStore}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);
