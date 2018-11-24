import React, { Component } from "react";
import Login from "./Login/Login";
import User from "./User";

export default class Header extends Component {
  render() {
    const { user, checkLogined, updateSessionToken } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <a className="nav-item text-white font-weight-bold">Home</a>
          {user ? <User user={user}/> : <Login checkLogined={checkLogined} updateSessionToken={updateSessionToken}/>}
        </div>
      </nav>
    );
  }
}
