import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class UIIcon extends React.PureComponent {
  render() {
    const { type, onClick, isAdd } = this.props;
    return (
      <FontAwesomeIcon
        icon={[isAdd ? "fas" : "far", `${type}`]}
        className="card-img--favourite"
        onClick={onClick}
      />
    );
  }
}
