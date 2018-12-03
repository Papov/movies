import React from "react";
import UIIcon from "../UI/UIIcon";
import AddToMyListConsumerHOC from "../../HOC/AddToMyListConsumer";
import MovieIconHOC from "../../HOC/MoviesIconHOC";

class WatchlistIcon extends React.PureComponent {

  render() {
    // console.log("watchlist");
    const { isAdd, addToMyList } = this.props;
    return <UIIcon type="bookmark" isAdd={isAdd} onClick={addToMyList} />;
  }
}

export default AddToMyListConsumerHOC(MovieIconHOC(WatchlistIcon, "watchlist"));
