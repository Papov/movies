import React, { Component } from "react";
import { fetchUrl, api_urls } from "../../../api/api";
import UIInput from "../../UI/UIInput";
import PropTypes from "prop-types";

export default class LoginFormModal extends Component {
  static propTypes = {
    updateSessionToken: PropTypes.func.isRequired,
    checkLogined: PropTypes.func.isRequired
  }
  //===================================================
  state = {
    username: "",
    password: "",
    repeatPassword: "",
    errors: {},
    submitAwait: false
  };
  //===================================================
  checkErrors = (event = null) => {
    const { username, password, repeatPassword } = this.state;
    const errors = {};
    const messages = {
      username: "please, write your login",
      password: "please, write your password",
      repeatPassword: "please, write the same password"
    };
    //----
    if (event) {
      let name = event.target.name;
      let length = this.state[name].length === 0;
      //----
      switch (name) {
        case "username":
          if (length) {
            errors.username = messages.username;
          }
          break;
        case "password":
          if (length) {
            errors.password = messages.password;
          }
          break;
        case "repeatPassword":
          if (password !== repeatPassword) {
            errors.repeatPassword = messages.repeatPassword;
          }
          break;
        default:
          break;
      }
      //----
      let valid = !!Object.keys(errors).length;
      if (valid) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            ...errors,
            base: null
          }
        }));
        return false;
      }
    } else {
      //----
      if (username === "") {
        errors.username = messages.username;
      }
      if (password === "") {
        errors.password = messages.password;
      }
      if (password !== repeatPassword) {
        errors.repeatPassword = messages.repeatPassword;
      }
      //----
      let valid = !!Object.keys(errors).length;
      if (valid) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            ...errors,
            base: null
          }
        }));
        return false;
      }
      //----
      if (!valid) {
        return true;
      }
    }
  };
  //===================================================
  onHandleChange = event => {
    const { name, value } = event.target;
    //----
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: null
      }
    }));
  };
  //===================================================
  onSubmit = async () => {
    const { username, password } = this.state;
    //----
    this.setState({
      submitAwait: true
    });
    //----
    try {
      const firstDataToken = await fetchUrl(api_urls.first_token);
      //----
      const validateLoginToken = await fetchUrl(api_urls.validate_with_login, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password,
          request_token: firstDataToken.request_token
        })
      });
      //----
      const { session_id } = await fetchUrl(api_urls.session, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          request_token: validateLoginToken.request_token
        })
      });
      //----
      this.props.updateSessionToken(session_id);
      //----
      const account = await fetchUrl(`${api_urls.account}${session_id}`);
      //----
      this.props.checkLogined(account);
      //----
      this.setState({
        submitAwait: false,
        errors: {
          registered: "Вход успешный"
        }
      });
      //----
    } catch (error) {
      this.setState({
        submitAwait: false,
        errors: {
          base: error.status_message
        }
      });
    }
  };
  //===================================================
  onSubmitClick = event => {
    event.preventDefault();
    const valid = this.checkErrors();
    if (valid) {
      this.onSubmit();
    }
  };
  //===================================================
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
          name="username"
          onChange={this.onHandleChange}
          onBlur={this.checkErrors}
          error={errors.username}
        />
        <UIInput
          id="password"
          name="password"
          value={password}
          label="Пароль"
          type="password"
          placeholder="Пароль"
          onChange={this.onHandleChange}
          onBlur={this.checkErrors}
          error={errors.password}
        />
        <UIInput
          id="repeatPassword"
          name="repeatPassword"
          value={repeatPassword}
          label="Повторить пароль"
          type="password"
          placeholder="Повторно введите пароль"
          onChange={this.onHandleChange}
          onBlur={this.checkErrors}
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
        {errors.base ? (
          <div className="invalid-feedback text-center">{errors.base}</div>
        ) : null}
        {errors.registered ? (
          <div className="valid-feedback text-center">{errors.registered}</div>
        ) : null}
      </form>
    );
  }
}
