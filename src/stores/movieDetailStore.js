import { observable, flow } from "mobx";
import { CallApi } from "../api/api";

class MovieDetailStore {
  @observable
  movieData = {};

  @observable
  videos = [];

  @observable
  similarMovies = [];

  @observable
  crew = [];

  @observable
  actors = [];

  @observable
  isLoading = true;

  @observable
  isLoadingTabs = true;

  getMovieVideo = flow(function*() {
    try {
      movieDetailStore.isLoadingTabs = true;
      const response = yield CallApi.get(
        `/movie/${this.match.params.id}/videos`,
        {
          params: {
            language: "ru-RU"
          }
        }
      );

      movieDetailStore.videos.replace(response.results);
      movieDetailStore.isLoadingTabs = false;
    } catch {
      console.log("error in TabVideo.jsx");
    }
  });

  getMovieActors = flow(function*() {
    try {
      movieDetailStore.isLoadingTabs = true;
      const response = yield CallApi.get(
        `/movie/${this.match.params.id}/credits`,
        {
          params: {
            language: "ru-RU"
          }
        }
      );
      // console.log("actors", response);
      movieDetailStore.actors.replace(response.cast);
      movieDetailStore.isLoadingTabs = false;
    } catch {
      console.log("error in TabActors.jsx");
    }
  });

  getMovieCrew = flow(function*() {
    try {
      movieDetailStore.isLoadingTabs = true;
      const response = yield CallApi.get(
        `/movie/${this.match.params.id}/credits`,
        {
          params: {
            language: "ru-RU"
          }
        }
      );
      movieDetailStore.crew.replace(response.crew);
      movieDetailStore.isLoadingTabs = false;
    } catch {
      console.log("error in TabCrew.jsx");
    }
  });

  getSimilarMovies = flow(function*() {
    try {
      movieDetailStore.isLoadingTabs = true;
      const similarMovies = yield CallApi.get(
        `/movie/${this.match.params.id}/similar`,
        {
          params: {
            language: "ru-RU"
          }
        }
      );
      movieDetailStore.isLoadingTabs = false;
      movieDetailStore.similarMovies.replace(similarMovies.results);
    } catch {
      console.log("error in TabSimilarMovies.jsx");
    }
  });

  getMovieData = flow(function*() {
    try {
      movieDetailStore.isLoading = true;
      movieDetailStore.movieData = yield CallApi.get(
        `/movie/${this.match.params.id}`,
        {
          params: {
            language: "ru-RU"
          }
        }
      );
      movieDetailStore.isLoading = false;
    } catch {
      console.log("error in movieDetailStore.js");
    }
  });
}

export const movieDetailStore = new MovieDetailStore();
