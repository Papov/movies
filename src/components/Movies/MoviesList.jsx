import React, { Component } from "react";
import { API_URL, API_KEY_3 } from "../../api/api";
import MovieItem from "./MovieItem";

export default class MoviesList extends Component {
  state = {
    movies: []
  };

  getMovies = (filters, page) => {
    const { sort_by } = filters;
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}`;
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
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
