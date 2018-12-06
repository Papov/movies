import React from "react";
import CallApi from "../../api/api";

export default class TabVideos extends React.Component {
  state = {
    isLoading: true
  };

  render() {
    const { isLoading, videos } = this.state;
    if (isLoading) {
      return (
        <div className="preloader">
          <div className="page-loader-circle" />
        </div>
      );
    }
    else if(!videos.length){return <p className='pt-4 text-center'>Видео для данного фильма отсутствуют</p>}
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

  async componentDidMount() {
    const response = await CallApi.get(
      `/movie/${this.props.match.params.id}/videos`,
      {
        params: {
          language: "ru-RU"
        }
      }
    );
    // console.log("video", response);
    this.setState({
      videos: response.results,
      isLoading: false
    });
  }
}
