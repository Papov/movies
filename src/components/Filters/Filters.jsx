import React, { Component } from "react";
import SortBy from "./SortBy";
import Pagination from "./Pagination";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Genres from "./Genres";

export default class Filters extends Component {
  render() {
    // PROPS
    const {
      filters: { sort_by, primary_release_year, with_genres },
      onChangeFilters,
      page,
      onChangePage,
      total_pages,
      onReset
    } = this.props;
    return (
      <form className="mb-3">
        <button type="button" className="btn btn-light" onClick={onReset}>
          Сбросить фильтр
        </button>
        {/*СОРТИРОВКА*/}
        <SortBy onChangeFilters={onChangeFilters} sort_by={sort_by} />
        {/*ГОД РЕЛИЗА*/}
        <PrimaryReleaseYear
          onChangeFilters={onChangeFilters}
          primary_release_year={primary_release_year}
        />
        {/*ЖАНРЫ*/}
        <Genres onChangeFilters={onChangeFilters} with_genres={with_genres} />
        {/*ПАГИНАЦИЯ*/}
        <Pagination
          onChangePage={onChangePage}
          page={page}
          total_pages={total_pages}
        />
      </form>
    );
  }
}
