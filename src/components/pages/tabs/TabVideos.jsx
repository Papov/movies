import React from "react";
import { Loader } from "../../ui/UILoader";
import { NoData } from "../../ui/UINoData";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";

@inject(({ movieDetailStore }) => ({
  isLoadingTabs: movieDetailStore.isLoadingTabs,
  getMovieVideo: movieDetailStore.getMovieVideo,
  videos: movieDetailStore.videos
}))
@observer
class TabVideos extends React.Component {
  static propTypes = {
    isLoadingTabs: PropTypes.bool.isRequired,
    getMovieVideo: PropTypes.func.isRequired,
    videos: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getMovieVideo();
  }

  render() {
    const { isLoadingTabs, videos } = this.props;
    if (isLoadingTabs) {
      return <Loader />;
    } else if (!videos.length) {
      return <NoData />;
    }
    return (
      <div className="container d-flex justify-content-start flex-wrap">
        {videos.map(video => (
          <div className="card movie-card" key={`video${video.id}`}>
            <iframe
              title={video.id}
              type="text/html"
              width="720"
              height="405"
              src={`https://www.youtube-nocookie.com/embed/${
                video.key
              }?cc_load_policy=1&color=white`}
              frameBorder="0"
              allowFullScreen
              className="video-iframe"
            />
            <p className="text-muted font-italic mb-0">{video.name}</p>
          </div>
        ))}
      </div>
    );
  }
}

export { TabVideos };
