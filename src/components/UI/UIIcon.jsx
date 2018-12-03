import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MoviesIconHOC from "../../HOC/MoviesIconHOC";
import AppConsumerHOC from "../../HOC/AppConsumerHOC";

const UIIcon = ({ iconImage, iconName, addToMyList, isAdd }) => {
  return (
    <span onClick={addToMyList(iconName)}>
      <FontAwesomeIcon
        icon={[isAdd ? "fas" : "far", `${iconImage}`]}
        className="card-img--favourite"
      />
    </span>
  );
};

export default AppConsumerHOC(MoviesIconHOC(UIIcon));
