import React from "react";
import UIIcon from "../UI/UIIcon";
import AddToMyListConsumerHOC from "../../HOC/AddToMyListConsumer";
import MovieIconHOC from "../../HOC/MoviesIconHOC";

class FavoriteIcon extends React.PureComponent {

  render() {
    // console.log("favorite");
    const { isAdd, addToMyList } = this.props;
    return <UIIcon isAdd={isAdd} type="heart" onClick={addToMyList} />;
  }
}

export default AddToMyListConsumerHOC(MovieIconHOC(FavoriteIcon, "favorite"));
