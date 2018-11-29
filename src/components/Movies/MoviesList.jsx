import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";

const MoviesList = ({ movies }) => (
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
);

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

MoviesList.defaultProps = {
  movies: []
};

export default MoviesHOC(MoviesList);
