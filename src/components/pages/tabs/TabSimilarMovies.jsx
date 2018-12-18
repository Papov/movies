import React from "react";
import FavoriteIcon from "../../movies/FavoriteIcon";
import WatchlistIcon from "../../movies/WatchlistIcon";
import { Link } from "react-router-dom";
import { CallApi } from "../../../api/api";
import { Loader } from "../../ui/UILoader";
import { NoData } from "../../ui/UINoData";

export class TabSimilarMovies extends React.Component {
  state = {
    isLoading: true
  };

  async componentDidMount() {
    const similarMovies = await CallApi.get(
      `/movie/${this.props.match.params.id}/similar`,
      {
        params: {
          language: "ru-RU"
        }
      }
    );
    // console.log(similarMovies);
    this.setState({
      isLoading: false,
      similarMovies: similarMovies.results
    });
  }

  render() {
    const { similarMovies, isLoading } = this.state;
    if (isLoading) {
      return <Loader />;
    } else if (!similarMovies.length) {
      return <NoData />;
    }
    return (
      <div className="container d-flex flex-wrap justify-content-center pt-4">
        {similarMovies.map(similarMovie => (
          <div className="card card-similar" key={`similar${similarMovie.id}`}>
            <img
              className="card-img-top card-img--height"
              src={`https://image.tmdb.org/t/p/w500${similarMovie.backdrop_path ||
                similarMovie.poster_path}`}
              alt="poster"
            />
            <div className="card-body">
              <Link
                className="card-title title link"
                to={`/movie/${similarMovie.id}/detail`}
              >
                {similarMovie.title}
              </Link>
              <div className="card-text">
                Рейтинг: {similarMovie.vote_average}
              </div>
              <div className="card-img d-flex justify-content-end">
                <FavoriteIcon movieId={similarMovie.id} />
                <WatchlistIcon movieId={similarMovie.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
