import React from "react";
import CallApi from "../../../api/api";
import { Loader } from "../../ui/UILoader";
import { NoData } from "../../ui/UINoData";
import Actor from "./credits/Actor";

export default class TabCredits extends React.Component {
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
    // console.log("actors", response);
    this.setState({
      persons: response.cast,
      isLoading: false
    });
  }

  render() {
    const { isLoading, persons } = this.state;
    if (isLoading) {
      return <Loader />;
    } else if (!persons.length) {
      return <NoData />;
    }
    return (
      <div className="d-flex flex-wrap justify-content-center pt-4 pb-4">
        {persons.map(person => {
          return <Actor key={`actor${person.credit_id}`} person={person} />;
        })}
      </div>
    );
  }
}
