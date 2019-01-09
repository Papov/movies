import React from "react";
import { TabApp } from "./tabs/TabApp";
import { Loader } from "../ui/UILoader";
import { MovieMainInfo } from "./MovieMainInfo";
import { observer, inject } from "mobx-react";

@inject(({ movieDetailStore }) => ({
  isLoading: movieDetailStore.isLoading,
  getMovieData: movieDetailStore.getMovieData
}))
@observer
class MoviePage extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.getMovieData();
    }
  }

  componentDidMount() {
    this.props.getMovieData();
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <MovieMainInfo />
        <TabApp />
      </React.Fragment>
    );
  }
}

export { MoviePage };
