import React from "react";
import CallApi from "../api/api";
import PropTypes from "prop-types";

const IconContainer = (Container, type) =>
  class IconMoviesHOC extends React.Component {
    static propTypes = {
      toogleLoginForm: PropTypes.func.isRequired,
      movieId: PropTypes.number,
      user: PropTypes.object
    };

    addToMyList = async () => {
      const { user, toogleLoginForm, movieId, session_id } = this.props;
      if (session_id) {
        const queryParams = {
          session_id: session_id
        };
        const body = {
          media_type: "movie",
          media_id: movieId,
          [type]: !this.props[type].includes(movieId)
        };
        this.setState({
          isLoading: true
        });
        const myList = await CallApi.post(`/account/${user.id}/${type}`, {
          params: queryParams,
          body: body
        });
        this.props.updateAddedMovie("watchlist");
        this.props.updateAddedMovie("favorite");
        console.log(type, "--", myList.status_message);
      } else {
        toogleLoginForm();
      }
    };

    shouldComponentUpdate(nextProps, nextState) {
      const thisMoviesList = this.props[type];
      const nextMoviesList = nextProps[type];
      const { movieId } = this.props;
      if (
        thisMoviesList.includes(movieId) !== nextMoviesList.includes(movieId)
      ) {
        return true;
      } else return false;
    }

    render() {
      // console.log("iconHOC");
      const { movieId } = this.props;
      return (
        <Container
          isAdd={this.props[type].includes(movieId)}
          addToMyList={this.addToMyList}
        />
      );
    }
  };

export default IconContainer;
