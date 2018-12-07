import React from "react";
import CallApi from "../../api/api";
import PropTypes from "prop-types";

const IconContainer = (Container, type) =>
  class IconMoviesHOC extends React.Component {
    static defaultProps = {
      [type]: [],
      access: null
    };

    state = {
      isAdd: this.props[type].includes(this.props.movieId)
    };

    static propTypes = {
      toogleLoginForm: PropTypes.func.isRequired,
      movieId: PropTypes.number,
      user: PropTypes.object
    };

    addToMyList = async () => {
      const { user, toogleLoginForm, movieId, session_id } = this.props;
      if (session_id) {
        this.setState(prevState => ({
          isAdd: !prevState.isAdd
        }));
        const queryParams = {
          session_id: session_id
        };
        const body = {
          media_type: "movie",
          media_id: movieId,
          [type]: !this.props[type].includes(movieId)
        };
        const addDeleteMovie = await CallApi.post(
          `/account/${user.id}/${type}`,
          {
            params: queryParams,
            body: body
          }
        );
        this.props.updateAddedMovie(type);
        console.log(type, "--", addDeleteMovie.status_message);
      } else {
        toogleLoginForm();
      }
    };

    componentDidUpdate(prevProps, prevState) {
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
        <Container isAdd={this.state.isAdd} addToMyList={this.addToMyList} />
      );
    }
  };

export default IconContainer;
