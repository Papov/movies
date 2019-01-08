import { observable, action, flow } from "mobx";
import { userStore } from "./userStore";
import { CallApi } from "../api/api";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class LoginFormStore {
  messages = {
    username: "please, write your login",
    password: "please, write your password",
    repeatPassword: "please, write the same password",
    base: "login or password is uncorrect"
  };

  @observable
  username = "vlad_link";

  @observable
  password = "Link0lnpassword";

  @observable
  repeatPassword = "Link0lnpassword";

  @observable
  errors = {};

  @observable
  submitAwait = false;

  @observable
  showLoginForm = false;

  @action
  checkErrorsOnBlur = name => () => {
    let length = this[name].length === 0;
    let { password, repeatPassword, messages } = this;
    let errors = {};
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
        this.errors[name] = errors[name];
      }
    }
  };

  @action
  toogleLoginForm = () => {
    this.showLoginForm = !this.showLoginForm;
  };

  @action
  checkAllErrors = () => {
    const { username, password, repeatPassword, messages } = this;
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
      Object.keys(errors).map(key => {
        this.errors[key] = errors[key];
        return false;
      });
      return false;
    } else {
      return true;
    }
  };

  @action
  onHandleChange = name => event => {
    const { value } = event.target;
    this[name] = value;
    this.errors[name] = null;
    this.errors.base = null;
  };

  onSubmit = flow(function*() {
    const { username, password } = loginFormStore;
    try {
      loginFormStore.submitAwait = true;
      const firstDataToken = yield CallApi.get("/authentication/token/new");
      const validateLoginToken = yield CallApi.post(
        "/authentication/token/validate_with_login",
        {
          body: {
            username: username,
            password: password,
            request_token: firstDataToken.request_token
          }
        }
      );
      const { session_id } = yield CallApi.post("/authentication/session/new", {
        body: {
          request_token: validateLoginToken.request_token
        }
      });
      userStore.session_id = session_id;
      cookies.set("session_id", session_id, {
        path: "/",
        expires: new Date(Date.now() + 2592000)
      });
      const user = yield CallApi.get("/account", {
        params: {
          session_id: session_id
        }
      });
      loginFormStore.submitAwait = false;
      loginFormStore.toogleLoginForm();
      userStore.user = user;
    } catch (error) {
      loginFormStore.submitAwait = false;
      this.errors.base = this.messages.base;
    }
  });

  @action
  onSubmitClick = event => {
    event.preventDefault();
    const valid = this.checkAllErrors();
    if (valid) {
      this.onSubmit();
    }
  };
}

export const loginFormStore = new LoginFormStore();
