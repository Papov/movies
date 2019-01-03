import React from "react";
import { CallApi } from "../../api/api";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

const MovieIconHOC = (Component, type) => {
  @inject(({ userStore, loginFormStore }) => ({
    user: userStore.user,
    toogleLoginForm: loginFormStore.toogleLoginForm,
    session_id: userStore.session_id,
    updateAddedMovie: userStore.updateAddedMovie,
    [type]: userStore[type]
  }))
  @observer
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
      const {
        user,
        toogleLoginForm,
        movieId,
        session_id,
        updateAddedMovie
      } = this.props;
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
            const response = await CallApi.post(`/account/${user.id}/${type}`, {
              params: queryParams,
              body: body
            });
            console.log(response);
            updateAddedMovie(type);
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
  }
  return IconMoviesHOC;
};
export { MovieIconHOC };
