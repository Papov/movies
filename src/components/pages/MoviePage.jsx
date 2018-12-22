import React from "react";
import { CallApi } from "../../api/api";
import { TabApp } from "./tabs/TabApp";
import { Loader } from "../ui/UILoader";
import { MovieMainInfo } from "./MovieMainInfo";
import { observer } from "mobx-react";

@observer
class MoviePage extends React.Component {
  state = {
    movieData: {},
    isLoading: true
  };

  getMovieData = async () => {
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
  };

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({
        isLoading: true
      });
      this.getMovieData();
    }
  }

  componentDidMount() {
    this.getMovieData();
  }

  render() {
    const { movieData, isLoading } = this.state;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <MovieMainInfo movieData={movieData} />
        <TabApp movieData={movieData} />
      </React.Fragment>
    );
  }
}

export default MoviePage;
