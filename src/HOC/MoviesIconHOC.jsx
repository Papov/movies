import React, { Component } from "react";
import { API_KEY_3, fetchUrl } from "../api/api";
import PropTypes from "prop-types";

const IconContainer = Container =>
  class IconMoviesHOC extends Component {
    displayName = "IconMoviesHOC";

    static propTypes = {
      toogleLoginForm: PropTypes.func.isRequired,
      icon_image: PropTypes.string.isRequired,
      icon_name: PropTypes.string.isRequired,
      item: PropTypes.object.isRequired,
      user: PropTypes.object
    };

    state = {
      isAdd: false
    };

    addToMyList = name => () => {
      const { user, toogleLoginForm } = this.props;
      if (user.session_id) {
        this.setState(
          {
            isAdd: !this.state.isAdd
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
                [name]: this.state.isAdd
              })
            });
            console.log(name, "--", myList.status_message);
          }
        );
      } else {
        toogleLoginForm();
      }
    };

    render() {
      const { icon_image, icon_name } = this.props;
      const { isAdd } = this.state;
      return (
        <Container
          icon_image={icon_image}
          icon_name={icon_name}
          addToMyList={this.addToMyList}
          isAdd={isAdd}
        />
      );
    }
  };

export default IconContainer;
