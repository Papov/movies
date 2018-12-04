import React from "react";
import { MoviesIconContext } from "../components/App";

export default Component =>
  class AddToMyListConsumer extends React.Component {
    render() {
      return (
        <MoviesIconContext.Consumer>
          {context => <Component {...this.props} {...context} />}
        </MoviesIconContext.Consumer>
      );
    }
  };
