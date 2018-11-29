import React, { Component } from "react";
import Login from "./Login/Login";
import User from "./User";
import PropTypes from "prop-types";

export default class Header extends Component {
  static propTypes = {
    toogleLoginForm: PropTypes.func.isRequired,
    showLoginForm: PropTypes.bool.isRequired,
    checkLogined: PropTypes.func.isRequired,
    cookies: PropTypes.object,
    user_info: PropTypes.object
  };
  render() {
    const {
      user: { user_info },
      checkLogined,
      showLoginForm,
      toogleLoginForm,
      cookies
    } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <a className="nav-item text-white font-weight-bold">Home</a>
          {user_info ? (
            <User checkLogined={checkLogined} cookies={cookies} />
          ) : (
            <Login
              checkLogined={checkLogined}
              showLoginForm={showLoginForm}
              toogleLoginForm={toogleLoginForm}
            />
          )}
        </div>
      </nav>
    );
  }
}
