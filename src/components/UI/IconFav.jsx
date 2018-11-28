import React, { Component } from "react";
import { API_KEY_3, fetchUrl } from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { AppContext } from "../App";

class IconFav extends Component {
  static propTypes = {
    toogleLoginForm: PropTypes.func.isRequired,
    icon_image: PropTypes.string.isRequired,
    icon_name: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  state = {
    [this.props.icon_name]: false
  };

  addToMyList = name => () => {
    const { user } = this.props;
    if (user.session_id) {
      this.setState(
        {
          [name]: !this.state[name]
        },
        async () => {
          let link = `/account/${
            user.user_info.id
          }/${name}?api_key=${API_KEY_3}&session_id=${user.session_id}`;
          const myList = await fetchUrl(link, {
            method: "POST",
            headers: {
              "Content-type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
              media_type: "movie",
              media_id: this.props.item.id,
              [name]: this.state[name]
            })
          });
          console.log(name, "--", myList.status_message);
        }
      );
    } else {
      this.props.toogleLoginForm();
    }
  };

  render() {
    const { icon_image, icon_name } = this.props;
    const solidFavorite = this.state[icon_name] ? "fas" : "far";
    return (
      <a onClick={this.addToMyList(icon_name)}>
        <FontAwesomeIcon
          icon={[`${solidFavorite}`, `${icon_image}`]}
          className="card-img--favourite"
        />
      </a>
    );
  }
}

const FavIconConsumer = props => (
  <AppContext>
    {({ toogleLoginForm, user }) => (
      <IconFav toogleLoginForm={toogleLoginForm} user={user} {...props} />
    )}
  </AppContext>
);

FavIconConsumer.displayName = "FavIconConsumer";

export default FavIconConsumer;
