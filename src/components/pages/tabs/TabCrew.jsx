import React from "react";
import { Loader } from "../../ui/UILoader";
import { NoData } from "../../ui/UINoData";
import { Crew } from "./credits/Crew";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

@inject(({ movieDetailStore }) => ({
  getMovieCrew: movieDetailStore.getMovieCrew,
  isLoadingTabs: movieDetailStore.isLoadingTabs,
  crew: movieDetailStore.crew
}))
@observer
class TabCrew extends React.Component {
  static propTypes = {
    getMovieCrew: PropTypes.func.isRequired,
    isLoadingTabs: PropTypes.bool.isRequired,
    crew: PropTypes.array.isRequired
  };
  componentDidMount() {
    this.props.getMovieCrew();
  }

  render() {
    const { isLoadingTabs, crew } = this.props;
    if (isLoadingTabs) {
      return <Loader />;
    } else if (!crew.length) {
      return <NoData />;
    }
    return (
      <div className="d-flex flex-wrap justify-content-center pt-4 pb-4">
        {crew.map(person => (
          <Crew key={`crew${person.credit_id}`} person={person} />
        ))}
      </div>
    );
  }
}

export { TabCrew };
