import React, { Component } from "react";
import MovieItem from "./MovieItem";
import queryString from "query-string";
import { fetchUrl, api_urls, API_KEY_3 } from "../../api/api";
import PropTypes from "prop-types";

export default class MoviesList extends Component {
  static propTypes = {
    getTotalPages: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    page: PropTypes.number
  };
  //===================================================
  state = {
    movies: []
  };
  //===================================================
  getMovies = async (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;
    //----
    const query = {
      api_key: API_KEY_3,
      language: "ru-RU",
      sort_by: sort_by,
      page: page,
      primary_release_year: primary_release_year
    };
    //----
    if (with_genres.length > 0) {
      query.with_genres = with_genres.join(",");
    }
    //----
    const link = `${api_urls.discover}${queryString.stringify(query)}`;
    //----
    const discover = await fetchUrl(link);
    //----
    this.setState({
      movies: discover.results
    });
    //----
    this.props.getTotalPages(discover.total_pages);
  };
  //===================================================
  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }
  //===================================================
  componentDidUpdate(prevProps) {
    if (this.props.filters !== prevProps.filters) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1);
    }
    //----
    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }
  }
  //===================================================
  render() {
    const { movies } = this.state;
    const { user, toogleLoginForm } = this.props;
    return (
      <div className="row">
        {movies.length === 0 ? (
          <h3 className="h3 text-center" style={{ width: "100%" }}>
            НЕТУ ФИЛЬМОВ ПО ДАННЫМ ПАРАМЕТРАМ
          </h3>
        ) : (
          movies.map(movie => {
            return (
              <div key={movie.id} className="col-6 mb-4">
                <MovieItem
                  item={movie}
                  user={user}
                  toogleLoginForm={toogleLoginForm}
                />
              </div>
            );
          })
        )}
      </div>
    );
  }
}
