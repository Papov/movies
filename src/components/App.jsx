import React, { Component, Fragment } from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import { fetchUrl, api_urls } from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

//===================================================
export default class App extends Component {
  state = {
    filters: {
      sort_by: "popularity.desc",
      primary_release_year: "",
      with_genres: []
    },
    page: 1,
    total_pages: "",
    user: null,
    session_token: null
  };
  //===================================================
  checkLogined = user => {
    this.setState({
      user
    });
  };
  //===================================================
  updateSessionToken = session_token => {
    this.setState({
      session_token
    });
    cookies.set("session_token", session_token, {
      path: "/",
      expires: new Date(Date.now()+2592000)
    });
  };
  //===================================================
  onChangeFilters = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      filters: {
        ...this.state.filters,
        [name]: value
      }
    }));
  };
  //===================================================
  getTotalPages = total_pages => {
    this.setState({
      total_pages
    });
  };
  //===================================================
  onReset = () => {
    // ОБЬЕКТ ИЗНАЧАЛЬНОГО СОСТОЯНИЯ
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
  //===================================================
  onChangePage = page => {
    this.setState({
      page
    });
  };
  //===================================================
  render() {
    const { filters, page, total_pages, user } = this.state;
    return (
      <Fragment>
        <Header
          checkLogined={this.checkLogined}
          user={user}
          updateSessionToken={this.updateSessionToken}
        />
        <div className="container">
          <div className="row mt-4">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h3>Фильтры:</h3>
                  <Filters
                    filters={filters}
                    onChangeFilters={this.onChangeFilters}
                    page={page}
                    onChangePage={this.onChangePage}
                    total_pages={total_pages}
                    onReset={this.onReset}
                  />
                </div>
              </div>
            </div>
            <div className="col-8">
              <MoviesList
                filters={filters}
                page={page}
                onChangePage={this.onChangePage}
                getTotalPages={this.getTotalPages}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
  //===================================================
  componentDidMount() {
    const session_id = cookies.get("session_token");
    if (cookies) {
      fetchUrl(`${api_urls.account}${session_id}`).then(user => {
        this.setState({
          user
        });
      });
    }
  }
}
