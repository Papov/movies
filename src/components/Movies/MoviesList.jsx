import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "../../HOC/MoviesHOC";

const MoviesList = ({ movies, isLoading }) => (
  <React.Fragment>
    {isLoading ? (
      <div className="preloader">
        <div className="page-loader-circle" />
      </div>
    ) : (
      <div className="row">
        {movies.length === 0 && !isLoading ? (
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

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

MoviesList.defaultProps = {
  movies: []
};

export default MoviesHOC(MoviesList);
