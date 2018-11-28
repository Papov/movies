import React, { Fragment } from "react";
import GenresHOC from './GenresHOC';

const Genres = ({ showAllGenres, genresList, checkedGenges, with_genres }) => (
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

export default GenresHOC(Genres);
