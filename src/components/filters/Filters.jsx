import React from "react";
import { SortBy } from "./SortBy";
import { Pagination } from "./Pagination";
import { PrimaryReleaseYear } from "./PrimaryReleaseYear";
import Genres from "./Genres";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

@inject(({ moviesStore }) => ({
  onReset: moviesStore.onReset
}))
@observer
class Filters extends React.Component {
  static propTypes = {
    onReset: PropTypes.func.isRequired
  };

  render() {
    const { onReset } = this.props;
    return (
      <form>
        <SortBy />
        <PrimaryReleaseYear />
        <Genres />
        <Pagination />
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

export { Filters };
