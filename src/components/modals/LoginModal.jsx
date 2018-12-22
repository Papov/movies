import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginFormModal from "../header/login/LoginFormModal";
import { observer, inject } from "mobx-react";

@inject(({ userStore }) => ({
  toogleLoginForm: userStore.toogleLoginForm,
  checkAuthorization: userStore.checkAuthorization,
  showLoginForm: userStore.showLoginForm
}))
@observer
class LoginModal extends React.Component {
  render() {
    const { toogleLoginForm, showLoginForm } = this.props;
    return (
      <Modal isOpen={showLoginForm} toggle={toogleLoginForm}>
        <ModalBody>
          <LoginFormModal toogleLoginForm={toogleLoginForm} />
        </ModalBody>
      </Modal>
    );
  }
}
export { LoginModal };
