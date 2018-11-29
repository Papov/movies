import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export default class Login extends Component {
  static propTypes = {
    checkLogined: PropTypes.func.isRequired,
    showLoginForm: PropTypes.bool,
    toogleLoginForm: PropTypes.func.isRequired
  };

  render() {
    const { toogleLoginForm } = this.props;
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-success"
          onClick={toogleLoginForm}
        >
          Login
        </button>
      </Fragment>
    );
  }
}
