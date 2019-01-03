import React from "react";
import User from "./User";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";

@inject(({ userStore, loginFormStore }) => ({
  user: userStore.user,
  toogleLoginForm: loginFormStore.toogleLoginForm
}))
@observer
class Header extends React.Component {
  static propTypes = {
    toogleLoginForm: PropTypes.func.isRequired,
    user: PropTypes.object
  };
  render() {
    const { user, toogleLoginForm } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <Link className="link nav-item text-white font-weight-bold" to="/">
            Home
          </Link>
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

export { Header };
