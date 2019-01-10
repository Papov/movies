import React from "react";
import { UIIcon } from "../ui/UIIcon";
import { observer, inject } from "mobx-react";

@inject(({ userStore }) => ({
  userStore
}))
@observer
class WatchlistIcon extends React.Component {
  render() {
    const {
      userStore: { addToMyList },
      movie: { id, watchlist }
    } = this.props;
    return (
      <UIIcon
        type="bookmark"
        isAdd={watchlist}
        onClick={addToMyList({
          type: "watchlist",
          movieId: id,
          isAdd: watchlist
        })}
      />
    );
  }
}

export { WatchlistIcon };
