import React from "react";
import { FavoriteIcon } from "../../movies/FavoriteIcon";
import { WatchlistIcon } from "../../movies/WatchlistIcon";
import { Link } from "react-router-dom";
import { Loader } from "../../ui/UILoader";
import { NoData } from "../../ui/UINoData";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";

@inject(({ movieDetailStore }) => ({
  getSimilarMovies: movieDetailStore.getSimilarMovies,
  isLoadingTabs: movieDetailStore.isLoadingTabs,
  similarMovies: movieDetailStore.similarMovies
}))
@observer
class TabSimilarMovies extends React.Component {
  static propTypes = {
    getSimilarMovies: PropTypes.func.isRequired,
    isLoadingTabs: PropTypes.bool.isRequired,
    similarMovies: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getSimilarMovies();
  }

  render() {
    const { similarMovies, isLoadingTabs } = this.props;
    if (isLoadingTabs) {
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

export { TabSimilarMovies };
