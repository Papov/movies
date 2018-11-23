import React, { Component } from "react";
import { API_KEY_3, API_URL } from "../../../api/api";

export default class LoginFormModal extends Component {
  state = {
    username: "",
    password: "",
    errors: {},
    submitAwait: false
  };
  //===================================================
  onBlurHandle = event => {
    if (this.state.username.length === 0) {
      this.setState({
        errors: {
          username: "please, white your login"
        }
      });
    }
  };
  //===================================================
  validateForm = () => {
    const { username, password } = this.state;
    const errors = {};
    if (username === "") {
      errors.username = "please, white your login";
    }
    if (password === "") {
      errors.password = "please, white your password";
    }
    const valid = !!Object.keys(errors).length;
    if (valid) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
      return false;
    }
    if (!valid) {
      return true;
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
    const api_urls = {
      first_token: "/authentication/token/new?api_key=",
      validate_with_login: "/authentication/token/validate_with_login?api_key=",
      session: "/authentication/session/new?api_key="
    };
    const { username, password } = this.state;
    //===================================================
    const fetchUrl = (url, body = {}) => {
      /*FETCHING URL TO GET TOKENS*/
      return new Promise((resolve, reject) => {
        const link = `${API_URL}${url}${API_KEY_3}`;
        fetch(link, body)
          .then(response => {
            if (response.status < 400) {
              return response.json();
            } else {
              throw response;
            }
          })
          .then(data => {
            resolve(data);
          })
          .catch(response => {
            response.json().then(error => {
              reject(error);
            });
          });
      });
    };
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
    const valid = this.validateForm();
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
            onBlur={this.onBlurHandle}
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
