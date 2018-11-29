import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MoviesIconHOC from "../../HOC/MoviesIconHOC";
import AppConsumerHOC from "../../HOC/AppConsumerHOC";

const UIIcon = ({ icon_image, icon_name, addToMyList, isAdd }) => (
  <span onClick={addToMyList(icon_name)}>
    <FontAwesomeIcon
      icon={[isAdd ? "fas" : "far", `${icon_image}`]}
      className="card-img--favourite"
    />
  </span>
);

export default AppConsumerHOC(MoviesIconHOC(UIIcon));
