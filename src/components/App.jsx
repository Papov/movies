import React, { Component } from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import LoginModal from "./Modals/LoginModal";
import CallApi from "../api/api";
import Cookies from "universal-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookmark as solidFaBookmark,
  faHeart as solidFaHeart
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faHeart,
  faClock
} from "@fortawesome/free-regular-svg-icons";

const cookies = new Cookies();
export const AppContext = React.createContext();
export const MoviesIconContext = React.createContext();
export const FilterContext = React.createContext();
library.add(faBookmark, faHeart, solidFaBookmark, solidFaHeart, faClock);

export default class App extends Component {
  state = {
    filters: {
      sort_by: "popularity.desc",
      primary_release_year: "",
      with_genres: []
    },
    user: null,
    session_id: null,
    page: 1,
    total_pages: "",
    showLoginForm: false,
    favorite: [],
    watchlist: []
  };

  updateAddedMovie = async listName => {
    const { user, session_id } = this.state;
    const responseApi = await CallApi.get(
      `/account/${user.id}/${listName}/movies`,
      {
        params: {
          language: "ru-RU",
          session_id: session_id
        }
      }
    );
    const moviesId = responseApi.results.map(item => item.id);
    this.setState({
      [listName]: moviesId
    });
  };

  updateUser = user => {
    if (user) {
      this.setState({
        user
      });
    } else {
      this.setState({
        user: null,
        session_id: null,
        favorite: [],
        watchlist: []
      });
    }
  };

  toogleLoginForm = () => {
    this.setState(prevState => ({
      showLoginForm: !prevState.showLoginForm
    }));
  };

  updateSessionId = session_id => {
    this.setState({
      session_id
    });
    cookies.set("session_id", session_id, {
      path: "/",
      expires: new Date(Date.now() + 2592000)
    });
  };

  onChangeFilters = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      filters: {
        ...this.state.filters,
        [name]: value
      }
    }));
  };

  getTotalPages = total_pages => {
    this.setState({
      total_pages
    });
  };

  onReset = () => {
    const pureState = {
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: "",
        with_genres: []
      },
      page: 1
    };
    this.setState({
      ...pureState
    });
  };

  onChangePage = page => {
    this.setState({
      page
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user !== this.state.user && !!this.state.user) {
      this.updateAddedMovie("watchlist");
      this.updateAddedMovie("favorite");
    }
  }

  render() {
    const {
      filters,
      page,
      total_pages,
      user,
      showLoginForm,
      favorite,
      watchlist,
      session_id
    } = this.state;
    return (
      <AppContext.Provider
        value={{
          user: user,
          session_id: session_id,
          updateSessionId: this.updateSessionId,
          updateUser: this.updateUser,
          cookies: cookies
        }}
      >
        <Header user={user} toogleLoginForm={this.toogleLoginForm} />
        <div className="container">
          <div className="row mt-4">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h3>Фильтры:</h3>
                  <FilterContext.Provider
                    value={{
                      filters: filters,
                      onChangeFilters: this.onChangeFilters,
                      page: page,
                      onChangePage: this.onChangePage,
                      total_pages: total_pages
                    }}
                  >
                    <Filters onReset={this.onReset} />
                  </FilterContext.Provider>
                </div>
              </div>
            </div>
            <div className="col-8">
              <MoviesIconContext.Provider
                value={{
                  watchlist: watchlist,
                  favorite: favorite,
                  toogleLoginForm: this.toogleLoginForm,
                  user: user,
                  session_id: session_id,
                  updateAddedMovie: this.updateAddedMovie
                }}
              >
                <MoviesList
                  filters={filters}
                  page={page}
                  onChangePage={this.onChangePage}
                  getTotalPages={this.getTotalPages}
                />
              </MoviesIconContext.Provider>
            </div>
          </div>
        </div>
        {showLoginForm && (
          <LoginModal
            showLoginForm={showLoginForm}
            toogleLoginForm={this.toogleLoginForm}
            updateUser={this.updateUser}
          />
        )}
      </AppContext.Provider>
    );
  }

  async componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      const user = await CallApi.get("/account", {
        params: {
          session_id: session_id
        }
      });
      this.setState({
        user,
        session_id
      });
    }
  }
}
