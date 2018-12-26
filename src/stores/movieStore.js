import { observable, action, reaction, flow } from "mobx";
import { CallApi } from "../api/api";

class MovieStore {
  @observable
  filters = {
    sort_by: "popularity.desc",
    primary_release_year: "",
    with_genres: []
  };

  @observable
  movieData = {};

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

  getMovies = flow(function*() {
    movieStore.isLoading = true;
    try {
      const { sort_by, primary_release_year, with_genres } = movieStore.filters;
      let queryParams = {
        language: "ru-RU",
        sort_by: sort_by,
        page: this.page,
        primary_release_year: primary_release_year
      };
      if (with_genres.length > 0) {
        queryParams.with_genres = with_genres.join(",");
      }
      const discover = yield CallApi.get("/discover/movie", {
        params: queryParams
      });
      movieStore.movies.replace(discover.results);
      movieStore.total_pages = discover.total_pages;
      movieStore.isLoading = false;
    } catch (e) {
      console.log(e);
    }
  });

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
    this.filters.with_genres = value;
  };
}

export const movieStore = new MovieStore();

reaction(
  () => Object.values(movieStore.filters),
  () => {
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
