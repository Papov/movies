import React from "react";
import TabDetail from "./TabDetail";
import TabVideos from "./TabVideos";
import TabCredits from "./TabCredits";
import TabCrew from "./TabCrew";
import TabSimilarMovies from "./TabSimilarMovies";
import { Route, Switch } from "react-router-dom";
import TabsNavigation from "./TabsNavigation";

export default class TabsApp extends React.Component {
  render() {
    const { movieData } = this.props;
    return (
      <React.Fragment>
        <TabsNavigation movieData={movieData} />
        <div className="tab-content">
          <Switch>
            <Route
              path="/movie/:id/detail"
              render={props => <TabDetail {...props} movieData={movieData} />}
            />
            <Route path="/movie/:id/videos" component={TabVideos} />
            <Route path="/movie/:id/credits" component={TabCredits} />
            <Route path="/movie/:id/crew" component={TabCrew} />
            <Route path="/movie/:id/similar" component={TabSimilarMovies} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
