import React from "react";
import CallApi from "../../../api/api";
import UIInput from "../../ui/UIInput";
import PropTypes from "prop-types";
import AppConsumerHOC from "../../hoc/AppConsumer";

class LoginFormModal extends React.Component {
  static propTypes = {
    updateSessionId: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired
  };

  static defaultProps = {
    messages: {
      username: "please, write your login",
      password: "please, write your password",
      repeatPassword: "please, write the same password"
    }
  };

  state = {
    username: "vlad_link",
    password: "Link0lnpassword",
    repeatPassword: "Link0lnpassword",
    errors: {},
    submitAwait: false
  };

  checkErrorsOnBlur = name => () => {
    let length = this.state[name].length === 0;
    const { password, repeatPassword } = this.state;
    const { messages } = this.props;
    const errors = {};
    if (length) {
      switch (name) {
        case "username":
          errors.username = messages.username;
          break;
        case "password":
          errors.password = messages.password;
          break;
        case "repeatPassword":
          if (password !== repeatPassword) {
            errors.repeatPassword = messages.repeatPassword;
          }
          break;
        default:
          break;
      }
      if (Object.keys(errors).length) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            ...errors,
            base: null
          }
        }));
      }
    }
  };

  checkAllErrors = () => {
    const { username, password, repeatPassword } = this.state;
    const { messages } = this.props;
    const errors = {};
    if (username === "") {
      errors.username = messages.username;
    }
    if (password === "") {
      errors.password = messages.password;
    }
    if (password !== repeatPassword) {
      errors.repeatPassword = messages.repeatPassword;
    }
    if (Object.keys(errors).length) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors,
          base: null
        }
      }));
      return false;
    } else {
      return true;
    }
  };

  onHandleChange = name => event => {
    const { value } = event.target;
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: null
      }
    }));
  };

  onSubmit = async () => {
    const { username, password } = this.state;
    this.setState({
      submitAwait: true
    });
    try {
      const firstDataToken = await CallApi.get("/authentication/token/new");
      const validateLoginToken = await CallApi.post(
        "/authentication/token/validate_with_login",
        {
          body: {
            username: username,
            password: password,
            request_token: firstDataToken.request_token
          }
        }
      );
      const { session_id } = await CallApi.post("/authentication/session/new", {
        body: {
          request_token: validateLoginToken.request_token
        }
      });
      this.props.updateSessionId(session_id);
      const user = await CallApi.get("/account", {
        params: {
          session_id: session_id
        }
      });
      this.setState(
        {
          submitAwait: false
        },
        () => {
          this.props.updateUser(user);
          this.props.toogleLoginForm();
        }
      );
    } catch (error) {
      this.setState({
        submitAwait: false,
        errors: {
          base: error.status_message
        }
      });
    }
  };

  onSubmitClick = event => {
    event.preventDefault();
    const valid = this.checkAllErrors();
    if (valid) {
      this.onSubmit();
    }
  };

  render() {
    const {
      username,
      password,
      repeatPassword,
      errors,
      submitAwait
    } = this.state;
    return (
      <form>
        <h4 className="h4 text-center">Авторизация</h4>
        <UIInput
          type="text"
          label="Логин"
          id="username"
          value={username}
          placeholder="Логин"
          onChange={this.onHandleChange("username")}
          onBlur={this.checkErrorsOnBlur("username")}
          error={errors.username}
        />
        <UIInput
          id="password"
          label="Пароль"
          type="password"
          value={password}
          placeholder="Пароль"
          onChange={this.onHandleChange("password")}
          onBlur={this.checkErrorsOnBlur("password")}
          error={errors.password}
        />
        <UIInput
          id="repeatPassword"
          label="Повторить пароль"
          type="password"
          value={repeatPassword}
          placeholder="Повторно введите пароль"
          onChange={this.onHandleChange("repeatPassword")}
          onBlur={this.checkErrorsOnBlur("repeatPassword")}
          error={errors.repeatPassword}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.onSubmitClick}
          disabled={submitAwait}
        >
          Вход
        </button>
        {errors.base && (
          <div className="invalid-feedback text-center">{errors.base}</div>
        )}
      </form>
    );
  }
}

export default AppConsumerHOC(LoginFormModal);
