import { observable, action, reaction } from "mobx";
import { CallApi } from "../api/api";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class UserStore {
  @observable
  user = null;

  @observable
  popovnerOpen = false;

  @observable
  session_id = null;

  @observable
  favorite = [];

  @observable
  watchlist = [];

  @action
  toggleMenu = () => {
    this.popovnerOpen = !this.popovnerOpen;
  };

  @action
  exitFromAccount = async () => {
    const { session_id } = this;
    await CallApi.delete("/authentication/session", {
      body: {
        session_id: session_id
      }
    });
    console.log("EXIT IS SUCCESS");
    this.onLogOut();
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
        this[listName].replace(moviesId);
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
