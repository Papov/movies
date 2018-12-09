import React from "react";
import UIIcon from "../UI/UIIcon";
import MovieIconHOC from "../HOC/MoviesIconHOC";
import AppConsumer from "../HOC/AppConsumer";

class WatchlistIcon extends React.PureComponent {
  render() {
    // console.log("watchlist");
    const { isAdd, addToMyList } = this.props;
    return <UIIcon type="bookmark" isAdd={isAdd} onClick={addToMyList} />;
  }
}

export default AppConsumer(MovieIconHOC(WatchlistIcon, "watchlist"));
