import React, { Component } from "react";
import { fetchUrl, api_urls } from "../../../api/api";

export default class LoginFormModal extends Component {
  state = {
    username: "",
    password: "",
    errors: {},
    submitAwait: false
  };
  //===================================================
  checkErrors = (event = null) => {
    const { username, password } = this.state;
    const errors = {};
    const messages = {
      username: "please, white your login",
      password: "please, white your password"
    };
    if (event) {
      const name = event.target.name;
      if (this.state[name].length === 0) {
        switch (name) {
          case "username":
            errors.username = messages.username;
            break;
          case "password":
            errors.password = messages.password;
            break;
          default:
            break;
        }
      }
      let valid = !!Object.keys(errors).length;
      if (valid) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            ...errors,
            base: null
          }
        }));
      }
    } else {
      if (username === "") {
        errors.username = messages.username;
      }
      if (password === "") {
        errors.password = messages.password;
      }
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
      if (!valid) {
        return true;
      }
    }
  };
  //===================================================
  onHandleChange = event => {
    const { name, value } = event.target;
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
    //===================================================
    this.setState({
      submitAwait: true
    });
    //===================================================
    try {
      const firstDataToken = await fetchUrl(api_urls.first_token);
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
      console.log(validateLoginToken);
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
      this.props.updateSessionToken(session_id);
      const account = await fetchUrl(`${api_urls.account}${session_id}`);
      this.props.checkLogined(account);
      this.setState({
        submitAwait: false,
        errors: {
          registered: "Вход успешный"
        }
      });
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
    const { username, password, errors, submitAwait } = this.state;
    return (
      <form>
        <h4 className="h4 text-center">Авторизация</h4>
        <div className="form-group">
          <label htmlFor="username">Логин</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            placeholder="Логин"
            name="username"
            onChange={this.onHandleChange}
            onBlur={this.checkErrors}
          />
          {errors.username ? (
            <div className="invalid-feedback">{errors.username}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            placeholder="Пароль"
            name="password"
            onChange={this.onHandleChange}
            onBlur={this.checkErrors}
          />
          {errors.password ? (
            <div className="invalid-feedback">{errors.password}</div>
          ) : null}
        </div>
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
