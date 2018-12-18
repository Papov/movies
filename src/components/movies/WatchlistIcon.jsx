import React from "react";
import { UIIcon } from "../ui/UIIcon";
import { MovieIconHOC } from "../hoc/MoviesIconHOC";
import { AppConsumer } from "../hoc/AppConsumer";

class WatchlistIcon extends React.PureComponent {
  render() {
    // console.log("watchlist");
    const { isAdd, addToMyList } = this.props;
    return <UIIcon type="bookmark" isAdd={isAdd} onClick={addToMyList} />;
  }
}

export default AppConsumer(MovieIconHOC(WatchlistIcon, "watchlist"));
