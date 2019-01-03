import React from "react";
import { UIIcon } from "../ui/UIIcon";
import { MovieIconHOC } from "../hoc/MoviesIconHOC";

class FavoriteIcon extends React.Component {
  render() {
    // console.log("favorite");
    const { isAdd, addToMyList } = this.props;
    return <UIIcon isAdd={isAdd} type="heart" onClick={addToMyList} />;
  }
}

export default MovieIconHOC(FavoriteIcon, "favorite");
