import React from "react";
import TabDetail from "./TabDetail";
import TabVideos from "./TabVideos";
import TabCredits from "./TabCredits";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Route, Switch, Link } from "react-router-dom";
import classnames from "classnames";

export default class Tabs extends React.Component {
  state = {
    activeTab: '1'
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
        <Nav tabs>
          <NavItem>
            <NavLink
              tag="div"
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.handleChangeTab("1");
              }}
            >
              <Link className="tab-link" to={`/movie/${movieData.id}/detail`}>
                detail
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
              <Link className="tab-link" to={`/movie/${movieData.id}/videos`}>
                videos
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
              <Link className="tab-link" to={`/movie/${movieData.id}/credits`}>
                credits
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
            </Switch>
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}
