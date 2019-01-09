import React from "react";
import { UIIcon } from "../ui/UIIcon";
import { observer, inject } from "mobx-react";

@inject(({ userStore }) => ({
  userStore
}))
@observer
class FavoriteIcon extends React.Component {
  render() {
    const {
      userStore: { addToMyList, favorite },
      movieId
    } = this.props;
    const isAdd = favorite.includes(movieId);
    return (
      <UIIcon
        isAdd={isAdd}
        type="heart"
        onClick={addToMyList({
          type: "favorite",
          isAdd,
          movieId
        })}
      />
    );
  }
}

export { FavoriteIcon };
