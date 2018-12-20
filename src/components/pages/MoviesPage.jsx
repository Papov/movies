import React from "react";
import { Filters } from "../filters/Filters";
import MoviesList from "../movies/MoviesList";
import { AppConsumer } from "../hoc/AppConsumer";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookmark as solidFaBookmark,
  faHeart as solidFaHeart
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { observer, inject } from "mobx-react";

library.add(faBookmark, faHeart, solidFaBookmark, solidFaHeart);

@inject(({ movieStore }) => ({
  filters: movieStore.filters,
  page: movieStore.page,
  total_pages: movieStore.total_pages,
  onReset: movieStore.onReset,
  onChangeFilters: movieStore.onChangeFilters,
  onChangePage: movieStore.onChangePage,
  getTotalPages: movieStore.getTotalPages
}))
@observer
class MoviesPage extends React.Component {
  render() {
    const {
      filters,
      page,
      total_pages,
      onReset,
      onChangeFilters,
      onChangePage,
      getTotalPages
    } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row mt-4">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h3>Фильтры:</h3>
                  <Filters
                    onReset={onReset}
                    filters={filters}
                    onChangeFilters={onChangeFilters}
                    page={page}
                    onChangePage={onChangePage}
                    total_pages={total_pages}
                  />
                </div>
              </div>
            </div>
            <div className="col-8">
              <MoviesList
                filters={filters}
                page={page}
                onChangePage={onChangePage}
                getTotalPages={getTotalPages}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AppConsumer(MoviesPage);
