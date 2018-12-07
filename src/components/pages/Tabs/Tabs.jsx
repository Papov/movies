import React from "react";
import TabDetail from "./TabDetail";
import TabVideos from "./TabVideos";
import TabCredits from "./TabCredits";
import TabCrew from "./TabCrew";
import TabSimilarMovies from "./TabSimilarMovies";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Route, Switch, Link } from "react-router-dom";
import classnames from "classnames";

export default class Tabs extends React.Component {
  state = {
    activeTab: "1"
  };

  handleChangeTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    const { movieData } = this.props;
    const { activeTab } = this.state;
    return (
      <React.Fragment>
        <Nav tabs className="mt-3">
          <NavItem>
            <NavLink
              tag="div"
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.handleChangeTab("1");
              }}
            >
              <Link
                className="tab-link text-center link"
                to={`/movie/${movieData.id}/detail`}
              >
                Детали
              </Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag="div"
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.handleChangeTab("2");
              }}
            >
              <Link
                className="tab-link text-center link"
                to={`/movie/${movieData.id}/similar`}
              >
                Похожие фильмы
              </Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag="div"
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.handleChangeTab("3");
              }}
            >
              <Link
                className="tab-link text-center link"
                to={`/movie/${movieData.id}/videos`}
              >
                Видео
              </Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag="div"
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.handleChangeTab("4");
              }}
            >
              <Link
                className="tab-link text-center link"
                to={`/movie/${movieData.id}/credits`}
              >
                Акторы
              </Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag="div"
              className={classnames({ active: this.state.activeTab === "5" })}
              onClick={() => {
                this.handleChangeTab("5");
              }}
            >
              <Link
                className="tab-link text-center link"
                to={`/movie/${movieData.id}/crew`}
              >
                Команда
              </Link>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId={activeTab}>
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
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}
