import { observable, action } from "mobx";

class MovieStore {
  @observable
  filters = {
    sort_by: "popularity.desc",
    primary_release_year: "",
    with_genres: []
  };

  @observable
  page = 1;

  @observable
  total_pages = "";

  @action
  onChangeFilters = event => {
    console.log(event.target.value);
    const { name, value } = event.target;
    this.filters[name] = value;
  };

  @action
  getTotalPages = total_pages => {
    this.total_pages = total_pages;
  };

  @action
  onReset = () => {
    this.filters.sort_by = "popularity.desc";
    this.filters.primary_release_year = "";
    this.filters.with_genres = [];
    this.page = 1;
  };

  @action
  onChangePage = page => {
    this.page = page;
  };
}

export const movieStore = new MovieStore();
