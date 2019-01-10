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
      userStore: { addToMyList },
      movie: { id, favorite }
    } = this.props;
    return (
      <UIIcon
        isAdd={favorite}
        type="heart"
        onClick={addToMyList({
          type: "favorite",
          movieId: id,
          isAdd: favorite
        })}
      />
    );
  }
}

export { FavoriteIcon };
