import React from "react";
import UIIcon from "../UI/UIIcon";
import MovieIconHOC from "../HOC/MoviesIconHOC";
import AppConsumer from "../HOC/AppConsumer";

class FavoriteIcon extends React.PureComponent {
  render() {
    // console.log("favorite");
    const { isAdd, addToMyList } = this.props;
    return <UIIcon isAdd={isAdd} type="heart" onClick={addToMyList} />;
  }
}

export default AppConsumer(MovieIconHOC(FavoriteIcon, "favorite"));
