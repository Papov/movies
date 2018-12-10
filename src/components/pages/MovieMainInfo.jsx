import React from "react";
import FavoriteIcon from "../movies/FavoriteIcon";
import WatchlistIcon from "../movies/WatchlistIcon";

export class MovieMainInfo extends React.PureComponent {
  render() {
    const { movieData } = this.props;
    return (
      // background-image
      <div
        style={{
          background: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieData.backdrop_path ||
            movieData.poster_path}) no-repeat 50%/cover`
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
                    <FavoriteIcon movieId={movieData.id} />
                  </span>
                  <span className="rounded-circle icon-effect">
                    <WatchlistIcon movieId={movieData.id} />
                  </span>
                </div>
                {/*слоган*/}
                {movieData.tagline && (
                  <div className="mt-2">
                    <h5 className="card-title mb-0">Слоган</h5>
                    <p className="card-text font-italic">{movieData.tagline}</p>
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
    );
  }
}
