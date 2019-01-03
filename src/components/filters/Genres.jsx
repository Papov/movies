import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

@inject(({ moviesStore }) => ({
  genresList: moviesStore.genresList,
  showAllGenres: moviesStore.showAllGenres,
  with_genres: moviesStore.filters.with_genres,
  checkedGenges: moviesStore.checkedGenges,
  genresDidMount: moviesStore.genresDidMount
}))
@observer
class Genres extends React.Component {
  static propTypes = {
    showAllGenres: PropTypes.func.isRequired,
    genresList: PropTypes.array.isRequired,
    checkedGenges: PropTypes.func.isRequired,
    with_genres: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.genresDidMount();
  }

  render() {
    const {
      showAllGenres,
      genresList,
      checkedGenges,
      with_genres
    } = this.props;
    // console.log("genres");
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
              checked={~with_genres.indexOf(String(genre.id))}
            />
            <label htmlFor={`id${genre.id}`}>{genre.name}</label>
          </div>
        ))}
      </Fragment>
    );
  }
}

export default Genres;
