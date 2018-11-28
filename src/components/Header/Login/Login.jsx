import React, { Component, Fragment } from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginFormConsumer from "./LoginFormModal";
import PropTypes from "prop-types";

export default class Login extends Component {
  static propTypes = {
    checkLogined: PropTypes.func.isRequired,
    showLoginForm: PropTypes.bool,
    toogleLoginForm: PropTypes.func.isRequired
  };

  render() {
    const { checkLogined, showLoginForm, toogleLoginForm } = this.props;
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-success"
          onClick={toogleLoginForm}
        >
          Login
        </button>
        <Modal isOpen={showLoginForm} toggle={toogleLoginForm}>
          <ModalBody>
            <LoginFormConsumer checkLogined={checkLogined} />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
