import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
// import "@babel/polyfill"; for ie11
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.scss";

ReactDOM.render(<App />, document.getElementById("root"));
