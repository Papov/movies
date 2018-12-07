import React from "react";
import CallApi from "../../../api/api";

export default class TabCrew extends React.Component {
  state = {
    isLoading: true
  };

  async componentDidMount() {
    const response = await CallApi.get(
      `/movie/${this.props.match.params.id}/credits`,
      {
        params: {
          language: "ru-RU"
        }
      }
    );
    // console.log("crew", response);
    this.setState({
      crew: response.crew,
      isLoading: false
    });
  }

  render() {
    const { isLoading, crew } = this.state;
    if (isLoading) {
      return (
        <div className="preloader">
          <div className="page-loader-circle" />
        </div>
      );
    } else if (!crew.length) {
      return (
        <p className="pt-4 text-center">Акторы по данному фильму отсутствуют</p>
      );
    }
    return (
      <div className="d-flex flex-wrap justify-content-center pt-4 pb-4">
        {crew.map(crew_element => {
          if (!crew_element.profile_path) {
            return false;
          }
          return (
            <div
              key={`crew${crew_element.credit_id}`}
              className="card card-actors position-relative"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${
                  crew_element.profile_path
                }`}
                alt={crew_element.name}
                className="image-actors"
              />
              <div className="info-actors text-left pl-1">
                <p className="m-0">{crew_element.name}</p>
                <p className="m-0">{`Отдел: ${crew_element.department}`}</p>
                <p className="m-0">{`Должность: ${crew_element.job}`}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
