import React from "react";
import Filters from "../Filters/Filters";
import MoviesList from "../Movies/MoviesList";
import AppConsumer from "../HOC/AppConsumer";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookmark as solidFaBookmark,
  faHeart as solidFaHeart
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";

library.add(faBookmark, faHeart, solidFaBookmark, solidFaHeart);

class MoviesPage extends React.Component {
  state = {
    filters: {
      sort_by: "popularity.desc",
      primary_release_year: "",
      with_genres: []
    },
    page: 1,
    total_pages: ""
  };

  onChangeFilters = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
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

  render() {
    const { filters, page, total_pages } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row mt-4">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h3>Фильтры:</h3>
                  <Filters
                    onReset={this.onReset}
                    filters={filters}
                    onChangeFilters={this.onChangeFilters}
                    page={page}
                    onChangePage={this.onChangePage}
                    total_pages={total_pages}
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
      </React.Fragment>
    );
  }
}

export default AppConsumer(MoviesPage);
