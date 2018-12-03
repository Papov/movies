import React, { Fragment } from "react";
import GenresHOC from "../../HOC/GenresHOC";
import PropTypes from "prop-types";

class Genres extends React.PureComponent {
  static propTypes = {
    showAllGenres: PropTypes.func.isRequired,
    genresList: PropTypes.array.isRequired,
    checkedGenges: PropTypes.func.isRequired,
    with_genres: PropTypes.array.isRequired
  };

  render() {
    const {
      showAllGenres,
      genresList,
      checkedGenges,
      with_genres
    } = this.props;
    return (
      <Fragment>
        <button
          className="btn btn-primary"
          type="button"
          onClick={showAllGenres}
          style={{ marginBottom: "15px" }}
        >
          Все жанры
        </button>
        {genresList.map(genre => (
          <div className="form-check" key={`genre${genre.id}`}>
            <input
              type="checkbox"
              className="form-check-input"
              value={genre.id}
              id={`id${genre.id}`}
              onChange={checkedGenges}
              checked={with_genres.indexOf(String(genre.id)) !== -1}
            />
            <label htmlFor={`id${genre.id}`}>{genre.name}</label>
          </div>
        ))}
      </Fragment>
    );
  }
}

export default GenresHOC(Genres);
