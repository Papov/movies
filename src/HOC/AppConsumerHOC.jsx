import React from "react";
import { AppContext } from "../components/App";

export default Component =>
  class AppHOC extends React.Component {
    render() {
      return (
        <AppContext.Consumer>
          {context => <Component {...this.props} {...context} />}
        </AppContext.Consumer>
      );
    }
  };
