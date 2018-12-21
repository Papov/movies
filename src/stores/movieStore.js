import { observable, action, reaction } from "mobx";
import { CallApi } from "../api/api";

class MovieStore {
  @observable
  filters = {
    sort_by: "popularity.desc",
    primary_release_year: "",
    with_genres: []
  };

  @observable
  movies = [];

  @observable
  isLoading = false;

  @observable
  genresList = [];

  @observable
  page = 1;

  @observable
  total_pages = "";

  @action
  getMovies = async () => {
    const { sort_by, primary_release_year, with_genres } = this.filters;
    let queryParams = {
      language: "ru-RU",
      sort_by: sort_by,
      page: this.page,
      primary_release_year: primary_release_year
    };
    if (with_genres.length > 0) {
      queryParams.with_genres = with_genres.join(",");
    }
    //this.isLoading = true;
    const discover = await CallApi.get("/discover/movie", {
      params: queryParams
    });
    this.movies = discover.results;
    //this.isLoading = false;
    this.total_pages = discover.total_pages;
  };

  @action
  onChangeFilters = event => {
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

  @action
  showAllGenres = () => {
    this.filters.with_genres = [];
  };

  @action
  genresDidMount = async () => {
    const data = await CallApi.get("/genre/movie/list", {
      params: {
        language: "ru-RU"
      }
    });
    this.genresList = data.genres;
  };

  @action
  checkedGenges = event => {
    const { with_genres } = this.filters;
    const value = event.target.checked
      ? [...with_genres, event.target.value]
      : with_genres.filter(genre => genre !== event.target.value);
    this.onChangeFilters({
      target: {
        name: "with_genres",
        value: value
      }
    });
  };
}

export const movieStore = new MovieStore();

reaction(
  () => movieStore.filters,
  filters => {
    movieStore.page = 1;
    movieStore.getMovies();
  }
);

reaction(
  () => movieStore.page,
  page => {
    movieStore.getMovies();
  }
);
