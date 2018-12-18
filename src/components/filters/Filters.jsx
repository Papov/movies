import React from "react";
import { SortBy } from "./SortBy";
import { Pagination } from "./Pagination";
import { PrimaryReleaseYear } from "./PrimaryReleaseYear";
import Genres from "./Genres";
import PropTypes from "prop-types";

export class Filters extends React.Component {
  static propTypes = {
    onReset: PropTypes.func.isRequired,
    onChangeFilters: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired
  };

  render() {
    const {
      page,
      onReset,
      onChangePage,
      filters,
      total_pages,
      onChangeFilters
    } = this.props;
    return (
      <form>
        <SortBy onChangeFilters={onChangeFilters} filters={filters} />
        <PrimaryReleaseYear
          onChangeFilters={onChangeFilters}
          filters={filters}
        />
        <Genres filters={filters} onChangeFilters={onChangeFilters} />
        <Pagination
          page={page}
          onChangePage={onChangePage}
          total_pages={total_pages}
        />
        <button
          type="button"
          className="btn btn-light m-auto d-block mt-sm-3"
          onClick={onReset}
        >
          Сбросить фильтр
        </button>
      </form>
    );
  }
}
