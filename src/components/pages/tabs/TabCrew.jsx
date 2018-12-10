import React from "react";
import CallApi from "../../../api/api";
import Loader from "../../ui/UILoader";
import Crew from "./credits/Crew";

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
      persons: response.crew,
      isLoading: false
    });
  }

  render() {
    const { isLoading, persons } = this.state;
    if (isLoading) {
      return <Loader />;
    } else if (!persons.length) {
      return <p className="pt-4 text-center">Данные отсутствуют</p>;
    }
    return (
      <div className="d-flex flex-wrap justify-content-center pt-4 pb-4">
        {persons.map(person => {
          if (!person.profile_path) {
            return false;
          }
          return <Crew key={`crew${person.credit_id}`} person={person} />;
        })}
      </div>
    );
  }
}
