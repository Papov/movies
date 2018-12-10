import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginFormModal from "../header/login/LoginFormModal";

export class LoginModal extends React.Component {
  render() {
    const { toogleLoginForm, showLoginForm, checkAuthorization } = this.props;
    return (
      <Modal isOpen={showLoginForm} toggle={toogleLoginForm}>
        <ModalBody>
          <LoginFormModal
            checkAuthorization={checkAuthorization}
            toogleLoginForm={toogleLoginForm}
          />
        </ModalBody>
      </Modal>
    );
  }
}
