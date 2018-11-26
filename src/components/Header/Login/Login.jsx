import React, { Component, Fragment } from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginFormModal from "./LoginFormModal";
import PropTypes from "prop-types";

export default class Login extends Component {
  static propTypes = {
    checkLogined: PropTypes.func.isRequired,
    updateSessionToken: PropTypes.func.isRequired,
    showLoginForm: PropTypes.bool,
    toogleLoginForm: PropTypes.func.isRequired
  }
  //===================================================
  render() {
    const {
      checkLogined,
      updateSessionToken,
      showLoginForm,
      toogleLoginForm
    } = this.props;
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
            <LoginFormModal
              checkLogined={checkLogined}
              updateSessionToken={updateSessionToken}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
