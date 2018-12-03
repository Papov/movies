import React from "react";
import CallApi from "../api/api";
import PropTypes from "prop-types";

const IconContainer = Container =>
  class IconMoviesHOC extends React.Component {
    displayName = "IconMoviesHOC";

    static propTypes = {
      toogleLoginForm: PropTypes.func.isRequired,
      iconImage: PropTypes.string.isRequired,
      iconName: PropTypes.string.isRequired,
      movieId: PropTypes.number,
      user: PropTypes.object
    };

    state = {
      isAdd: false
    };

    addToMyList = name => () => {
      const { user, toogleLoginForm, movieId } = this.props;
      if (user.session_id) {
        this.setState(
          {
            isAdd: !this.state.isAdd
          },
          async () => {
            const queryParams = {
              session_id: user.session_id
            };
            const body = {
              media_type: "movie",
              media_id: movieId,
              [name]: this.state.isAdd
            };

            const myList = await CallApi.post(
              `/account/${user.user_info.id}/${name}`,
              {
                params: queryParams,
                body: body
              }
            );
            console.log(name, "--", myList.status_message);
          }
        );
      } else {
        toogleLoginForm();
      }
    };

    render() {
      const { iconImage, iconName } = this.props;
      const { isAdd } = this.state;
      return (
        <Container
          iconImage={iconImage}
          iconName={iconName}
          addToMyList={this.addToMyList}
          isAdd={isAdd}
        />
      );
    }
  };

export default IconContainer;
