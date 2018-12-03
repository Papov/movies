import React from "react";
import { FilterContext } from "../components/App";

export default Component =>
  class FilterConsumerHOC extends React.Component {
    render() {
      return (
        <FilterContext.Consumer>
          {context => <Component {...this.props} {...context} />}
        </FilterContext.Consumer>
      );
    }
  };
