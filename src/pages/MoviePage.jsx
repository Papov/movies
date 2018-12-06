import React from "react";
import CallApi from "../api/api";
import AppConsumer from "../HOC/AppConsumer";
import FavoriteIcon from "../components/Movies/FavoriteIcon";
import WatchlistIcon from "../components/Movies/WatchlistIcon";
import Tabs from "./Tabs/Tabs";

class MoviePage extends React.Component {
  state = {
    movieData: {},
    isLoading: true
  };

  render() {
    const { movieData, isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="preloader">
          <div className="page-loader-circle" />
        </div>
      );
    }
    return (
      <React.Fragment>
        {/*background-image*/}
        <div
          style={{
            background: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${
              movieData.backdrop_path
            }) no-repeat 50%/cover`
          }}
        >
          <div className="second_layer">
            <div className="container">
              <div className="row">
                {/*poster*/}
                <div className="col-sm-4">
                  <img
                    className="card-img rounded shadow-lg"
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${
                      movieData.poster_path
                    }`}
                    alt="poster"
                  />
                </div>
                {/*movie info*/}
                <div className="col-sm-8 text-white">
                  <div>
                    <h3 className="font-weight-bold float-left mb-0 mr-2">
                      {movieData.title || movieData.original_title}{" "}
                    </h3>

                    <span className="text-muted film-year">
                      ( {String(movieData.release_date).split("-")[0]} )
                    </span>
                  </div>
                  {/*movies icon*/}
                  <div className="d-flex mt-2">
                    <p className="rounded-circle vote-average mb-0 d-flex align-items-center justify-content-center">
                      {movieData.vote_average}
                    </p>
                    <span className="rounded-circle icon-effect">
                      <FavoriteIcon movieId={movieData.id} access={true} />
                    </span>
                    <span className="rounded-circle icon-effect">
                      <WatchlistIcon movieId={movieData.id} access={true} />
                    </span>
                  </div>
                  {/*слоган*/}
                  {movieData.tagline && (
                    <div className="mt-2">
                      <h5 className="card-title mb-0">Слоган</h5>
                      <p className="card-text font-italic">
                        {movieData.tagline}
                      </p>
                    </div>
                  )}
                  <div className="mt-2">
                    <h5 className="card-title mb-0">Описание</h5>
                    <p className="card-text">
                      {movieData.overview
                        ? movieData.overview
                        : "Для данного фильма нету описания"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tabs movieData={movieData} />
      </React.Fragment>
    );
  }

  async componentDidMount() {
    const response = await CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: {
        language: "ru-RU"
      }
    });
    // console.log("movieData", response);
    this.setState({
      movieData: response,
      isLoading: false
    });
  }
}

export default AppConsumer(MoviePage);
