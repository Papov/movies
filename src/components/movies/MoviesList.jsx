import React from "react";
import { MovieItem } from "./MovieItem";
import { PropTypes } from "prop-types";
import { observer, inject } from "mobx-react";

@inject(({ movieStore }) => ({
  movies: movieStore.movies,
  isLoading: movieStore.isLoading,
  getMovies: movieStore.getMovies
}))
@observer
class MoviesList extends React.Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getMovies: PropTypes.func.isRequired
  };

  static defaultProps = {
    movies: []
  };

  componentDidMount() {
    this.props.getMovies();
  }

  render() {
    const { movies, isLoading } = this.props;
    return (
      <React.Fragment>
        {isLoading ? (
          <div className="preloader">
            <div className="page-loader-circle" />
          </div>
        ) : (
          <div className="row">
            {movies.length === 0 ? (
              <h3 className="h3 text-center" style={{ width: "100%" }}>
                Нету фильмов
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
        )}
      </React.Fragment>
    );
  }
}

export default MoviesList;
