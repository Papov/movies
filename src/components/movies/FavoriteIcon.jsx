import React from "react";
import { UIIcon } from "../ui/UIIcon";
import { MovieIconHOC } from "../hoc/MoviesIconHOC";
import { AppConsumer } from "../hoc/AppConsumer";

class FavoriteIcon extends React.PureComponent {
  render() {
    // console.log("favorite");
    const { isAdd, addToMyList } = this.props;
    return <UIIcon isAdd={isAdd} type="heart" onClick={addToMyList} />;
  }
}

export default AppConsumer(MovieIconHOC(FavoriteIcon, "favorite"));
