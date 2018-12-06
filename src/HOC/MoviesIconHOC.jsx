import React from "react";
import CallApi from "../api/api";
import PropTypes from "prop-types";

const IconContainer = (Container, type) =>
  class IconMoviesHOC extends React.PureComponent {
    static defaultProps = {
      [type]: [],
      access: null
    };

    state = {
      isAdd: this.props[type].includes(this.props.movieId)
    }

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
        }))
        const queryParams = {
          session_id: session_id
        };
        const body = {
          media_type: "movie",
          media_id: movieId,
          [type]: !this.props[type].includes(movieId)
        };
        const addDeleteMovie = await CallApi.post(`/account/${user.id}/${type}`, {
          params: queryParams,
          body: body
        });
        this.props.updateAddedMovie("watchlist");
        this.props.updateAddedMovie("favorite");
        console.log(type, "--", addDeleteMovie.status_message);
      } else {
        toogleLoginForm();
      }
    };

    // shouldComponentUpdate(nextProps, nextState) {
    //   const { movieId } = this.props;
    //   return (
    //     (this.props.access && !!this.props.user) ||
    //     this.props[type].includes(movieId) !== nextProps[type].includes(movieId)
    //   );
    // }

    componentDidUpdate(prevProps, prevState){
      if(prevProps[type].includes(this.props.movieId) !== this.props[type].includes(this.props.movieId)){
        this.setState({
          isAdd: this.props[type].includes(this.props.movieId)
        })
      }
    }

    render() {
      console.log("iconHOC");
      // const { movieId } = this.props;
      return (
        <Container
          isAdd={this.state.isAdd}
          addToMyList={this.addToMyList}
        />
      );
    }
  };

export default IconContainer;
