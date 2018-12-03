import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "../Header/Login/LoginFormModal";

export default class LoginModal extends React.Component {
  render() {
    const { toogleLoginForm, showLoginForm, checkAuthorization } = this.props;
    return (
      <Modal isOpen={showLoginForm} toggle={toogleLoginForm}>
        <ModalBody>
          <LoginForm
            checkAuthorization={checkAuthorization}
            toogleLoginForm={toogleLoginForm}
          />
        </ModalBody>
      </Modal>
    );
  }
}
