import React from "react";
import { Loader } from "../../ui/UILoader";
import { NoData } from "../../ui/UINoData";
import { Actor } from "./credits/Actor";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";

@inject(({ movieDetailStore }) => ({
  actors: movieDetailStore.actors,
  getMovieActors: movieDetailStore.getMovieActors,
  isLoadingTabs: movieDetailStore.isLoadingTabs
}))
@observer
class TabActors extends React.Component {
  static propTypes = {
    getMovieActors: PropTypes.func.isRequired,
    isLoadingTabs: PropTypes.bool.isRequired,
    actors: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getMovieActors();
  }

  render() {
    const { isLoadingTabs, actors } = this.props;
    if (isLoadingTabs) {
      return <Loader />;
    } else if (!actors.length) {
      return <NoData />;
    }
    return (
      <div className="d-flex flex-wrap justify-content-center pt-4 pb-4">
        {actors.map(person => {
          return <Actor key={`actor${person.credit_id}`} person={person} />;
        })}
      </div>
    );
  }
}

export { TabActors };
