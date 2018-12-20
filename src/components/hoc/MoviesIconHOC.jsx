import React from "react";
import { CallApi } from "../../api/api";
import PropTypes from "prop-types";

export const MovieIconHOC = (Component, type) =>
  class IconMoviesHOC extends React.Component {
    static defaultProps = {
      [type]: []
    };

    state = {
      isAdd: false
    };

    static propTypes = {
      toogleLoginForm: PropTypes.func.isRequired,
      movieId: PropTypes.number,
      user: PropTypes.object
    };

    addToMyList = () => {
      const { user, toogleLoginForm, movieId, session_id } = this.props;
      if (session_id) {
        this.setState(
          prevState => ({
            isAdd: !prevState.isAdd
          }),
          async () => {
            const queryParams = {
              session_id: session_id
            };
            const body = {
              media_type: "movie",
              media_id: movieId,
              [type]: this.state.isAdd
            };
            await CallApi.post(`/account/${user.id}/${type}`, {
              params: queryParams,
              body: body
            });
            this.props.updateAddedMovie(type);
          }
        );
      } else {
        toogleLoginForm();
      }
    };

    componentDidUpdate(prevProps) {
      const { movieId } = this.props;
      if (
        prevProps[type].includes(movieId) !== this.props[type].includes(movieId)
      ) {
        this.setState({
          isAdd: this.props[type].includes(movieId)
        });
      }
    }

    render() {
      // console.log("iconHOC");
      return (
        <Component isAdd={this.state.isAdd} addToMyList={this.addToMyList} />
      );
    }
  };
