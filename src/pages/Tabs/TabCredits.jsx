import React from "react";
import CallApi from "../../api/api";

export default class TabCredits extends React.Component {
  state = {
    isLoading: true
  };

  render() {
    const { isLoading, actors } = this.state;
    if (isLoading) {
      return (
        <div className="preloader">
          <div className="page-loader-circle" />
        </div>
      );
    }
    return (
      <div className="d-flex flex-wrap justify-content-center pt-4 pb-4">
        {actors.map(actor => {
          if (!actor.profile_path) {
            return false;
          }
          return (
            <div
              key={`actor${actor.id}`}
              className="card card-actors position-relative"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                className="image-actors"
              />
              <div className="info-actors">
                <p className="m-0">{actor.name}</p>
                <p className="m-0">в роли</p>
                <p className="m-0">{actor.character}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  async componentDidMount() {
    const response = await CallApi.get(
      `/movie/${this.props.match.params.id}/credits`,
      {
        params: {
          language: "ru-RU"
        }
      }
    );
    // console.log("actors", response);
    this.setState({
      actors: response.cast,
      isLoading: false
    });
  }
}
