import React, { Component, Fragment } from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginFormModal from "./LoginFormModal";

export default class Login extends Component {
  state = {
    showLoginForm: false
  };
  //===================================================
  toogleLoginForm = () => {
    this.setState(prevState => ({
      showLoginForm: !prevState.showLoginForm
    }));
  };
  //===================================================
  render() {
    const {checkLogined,updateSessionToken} = this.props;
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-success"
          onClick={this.toogleLoginForm}
        >
          Login
        </button>
        <Modal isOpen={this.state.showLoginForm} toggle={this.toogleLoginForm}>
          <ModalBody>
            <LoginFormModal checkLogined={checkLogined} updateSessionToken={updateSessionToken}/>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
