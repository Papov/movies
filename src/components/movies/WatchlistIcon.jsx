import React from "react";
import { UIIcon } from "../ui/UIIcon";
import { observer, inject } from "mobx-react";

@inject(({ userStore }) => ({
  userStore
}))
@observer
class WatchlistIcon extends React.Component {
  render() {
    // console.log("watchlist");
    const {
      userStore: { addToMyList, watchlist },
      movieId
    } = this.props;
    const isAdd = watchlist.includes(movieId);
    return (
      <UIIcon
        type="bookmark"
        isAdd={isAdd}
        onClick={addToMyList({
          type: "watchlist",
          isAdd,
          movieId
        })}
      />
    );
  }
}

export { WatchlistIcon };
