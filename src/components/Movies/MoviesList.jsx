import React, { Component } from "react";
import { API_URL, API_KEY_3 } from "../../api/api";
import MovieItem from "./MovieItem";
import queryString from "query-string";
import PropTypes from "prop-types";

export default class MoviesList extends Component {
  static propTypes = {
    getTotalPages: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    page: PropTypes.number
  };
  state = {
    movies: []
  };

  // ПОЛУЧАЕМ ДАННЫЕ ИЗ API
  getMovies = (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;
    // КЛЮЧ - ЗНАЧЕНИЕ ЗАПРОСА
    const query = {
      api_key: API_KEY_3,
      language: "ru-RU",
      sort_by: sort_by,
      page: page,
      primary_release_year: primary_release_year
    };
    if (with_genres.length > 0) {
      query.with_genres = with_genres.join(",");
    }
    const link = `${API_URL}/discover/movie?${queryString.stringify(
      query
    )}`; /*ПРЕОБРАЗУЕМ В НУЖНЫЙ НАМ ФОРМАТ ЗАПРОСА*/
    fetch(link)
      .then(responseData => responseData.json())
      .then(data => {
        this.setState({
          movies: data.results
        });
        this.props.getTotalPages(data.total_pages);
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate(prevProps) {
    if (this.props.filters !== prevProps.filters) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1);
    }
    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }
  }

  render() {
    const { movies } = this.state;
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
                <MovieItem item={movie} />
              </div>
            );
          })
        )}
      </div>
    );
  }
}
