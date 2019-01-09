import React from "react";
import { TabDetail } from "./TabDetail";
import { TabVideos } from "./TabVideos";
import { TabActors } from "./TabActors";
import { TabCrew } from "./TabCrew";
import { TabSimilarMovies } from "./TabSimilarMovies";
import { Route, Switch } from "react-router-dom";
import { TabsNavigation } from "./TabNavigation";

class TabApp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TabsNavigation />
        <div className="tab-content">
          <Switch>
            <Route path="/movie/:id/detail" component={TabDetail} />
            <Route path="/movie/:id/videos" component={TabVideos} />
            <Route path="/movie/:id/credits" component={TabActors} />
            <Route path="/movie/:id/crew" component={TabCrew} />
            <Route path="/movie/:id/similar" component={TabSimilarMovies} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export { TabApp };
