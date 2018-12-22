import { observable, action, reaction } from "mobx";
import { CallApi } from "../api/api";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class UserStore {
  messages = {
    username: "please, write your login",
    password: "please, write your password",
    repeatPassword: "please, write the same password"
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
  user = null;

  @observable
  popovnerOpen = false;

  @observable
  session_id = null;

  @observable
  showLoginForm = false;

  @observable
  favorite = [];

  @observable
  watchlist = [];

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
      this.errors = errors;
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
  };

  @action
  onSubmit = async () => {
    const { username, password } = this;
    //this.submitAwait = true;
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
      this.session_id = session_id;
      cookies.set("session_id", session_id, {
        path: "/",
        expires: new Date(Date.now() + 2592000)
      });
      const user = await CallApi.get("/account", {
        params: {
          session_id: session_id
        }
      });
      //this.submitAwait = false;
      this.toogleLoginForm();
      this.user = user;
    } catch (error) {
      // this.submitAwait = false
    }
  };

  @action
  onSubmitClick = event => {
    event.preventDefault();
    const valid = this.checkAllErrors();
    if (valid) {
      this.onSubmit();
    }
  };

  @action
  toggleMenu = () => {
    this.popovnerOpen = !this.popovnerOpen;
  };

  @action
  exitFromAccount = bool => async () => {
    const { session_id } = this;
    if (bool) {
      await CallApi.delete("/authentication/session", {
        body: {
          session_id: session_id
        }
      });
      console.log("EXIT IS SUCCESS");
      this.onLogOut();
    } else {
      this.toggleMenu();
    }
  };

  @action
  updateAddedMovie = listName => {
    const { user, session_id } = this;
    const moviesId = [];
    let page = 1;
    const getAddedMovies = async () => {
      const responseApi = await CallApi.get(
        `/account/${user.id}/${listName}/movies`,
        {
          params: {
            language: "ru-RU",
            session_id: session_id,
            page: page
          }
        }
      );
      moviesId.push(...responseApi.results.map(item => item.id));
      if (responseApi.total_pages > page) {
        page++;
        getAddedMovies();
      } else {
        this[listName] = moviesId;
      }
    };
    getAddedMovies();
  };

  @action
  onLogOut = () => {
    cookies.remove("session_id", {
      path: "/"
    });
    this.user = null;
    this.session_id = null;
    this.popovnerOpen = false;
  };

  @action
  toogleLoginForm = () => {
    this.showLoginForm = !this.showLoginForm;
  };

  @action
  getSessionIdFromCookie = async () => {
    const session_id = cookies.get("session_id");
    if (session_id) {
      const user = await CallApi.get("/account", {
        params: {
          session_id: session_id
        }
      });
      this.session_id = session_id;
      this.user = user;
    }
  };
}

export const userStore = new UserStore();

reaction(
  () => userStore.user,
  user => {
    if (user) {
      userStore.updateAddedMovie("watchlist");
      userStore.updateAddedMovie("favorite");
    } else {
      userStore.favorite.clear();
      userStore.watchlist.clear();
    }
  }
);
