import React from "react";
import User from "./User";
import PropTypes from "prop-types";

export default class Header extends React.PureComponent {
  static propTypes = {
    toogleLoginForm: PropTypes.func.isRequired,
    user: PropTypes.object
  };
  render() {
    const { user, toogleLoginForm } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <span className="nav-item text-white font-weight-bold">Home</span>
          {user ? (
            <User />
          ) : (
            <button
              type="button"
              className="btn btn-success"
              onClick={toogleLoginForm}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    );
  }
}
