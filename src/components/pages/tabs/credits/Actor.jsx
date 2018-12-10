import React from "react";
import PropTypes from "prop-types";

const noAvatar =
  "https://static.reverb-assets.com/assets/avatars/default-af2a21e98f66532fb06e6082cfd9cffb.jpg";

class Actor extends React.PureComponent {
  static propTypes = {
    person: PropTypes.object.isRequired
  };

  render() {
    const { person } = this.props;
    return (
      <div className="card card-actors position-relative">
        <img
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
              : noAvatar
          }
          alt={person.name}
          className="image-actors"
        />
        <div className="info-actors">
          <p className="m-0">{person.name}</p>
          <p className="m-0">в роли</p>
          <p className="m-0">{person.character}</p>
        </div>
      </div>
    );
  }
}

export default Actor;
