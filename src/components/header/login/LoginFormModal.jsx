import React from "react";
import { UIInput } from "../../ui/UIInput";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

@inject(({ userStore }) => ({
  username: userStore.username,
  password: userStore.password,
  repeatPassword: userStore.repeatPassword,
  errors: userStore.errors,
  submitAwait: userStore.submitAwait,
  onHandleChange: userStore.onHandleChange,
  checkErrorsOnBlur: userStore.checkErrorsOnBlur,
  onSubmitClick: userStore.onSubmitClick
}))
@observer
class LoginFormModal extends React.Component {
  static propTypes = {
    updateSessionId: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired
  };

  render() {
    const {
      username,
      password,
      repeatPassword,
      errors,
      submitAwait,
      onHandleChange,
      checkErrorsOnBlur,
      onSubmitClick
    } = this.props;
    return (
      <form>
        <h4 className="h4 text-center">Авторизация</h4>
        <UIInput
          type="text"
          label="Логин"
          id="username"
          value={username}
          placeholder="Логин"
          onChange={onHandleChange("username")}
          onBlur={checkErrorsOnBlur("username")}
          error={errors.username}
        />
        <UIInput
          id="password"
          label="Пароль"
          type="password"
          value={password}
          placeholder="Пароль"
          onChange={onHandleChange("password")}
          onBlur={checkErrorsOnBlur("password")}
          error={errors.password}
        />
        <UIInput
          id="repeatPassword"
          label="Повторить пароль"
          type="password"
          value={repeatPassword}
          placeholder="Повторно введите пароль"
          onChange={onHandleChange("repeatPassword")}
          onBlur={checkErrorsOnBlur("repeatPassword")}
          error={errors.repeatPassword}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={onSubmitClick}
          disabled={submitAwait}
        >
          Вход
        </button>
      </form>
    );
  }
}

export default LoginFormModal;
