import React, { Component } from "react";
import PropTypes from "prop-types";
import { API_KEY_3, fetchUrl } from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//===================================================
const noImageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png";
//===================================================
export default class MovieItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    toogleLoginForm: PropTypes.func.isRequired,
    user: PropTypes.object
  };
  //===================================================
  state = {
    favorite: false,
    watchlist: false
  };
  //===================================================
  addToMyList = async event => {
    const { name } = event.currentTarget;
    const { user } = this.props;
    //----
    if (user.session_token) {
      this.setState({
        [name]: !this.state[name]
      });
      //----
      let link = `/account/${
        user.user_info.id
      }/${name}?api_key=${API_KEY_3}&session_id=${user.session_token}`;
      //----
      const myList = await fetchUrl(link, {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: this.props.item.id,
          [name]: !this.state[name]
        })
      });
      //----
      console.log(myList);
    } else {
      this.props.toogleLoginForm();
    }
  };
  //===================================================
  render() {
    const { favorite, watchlist } = this.state;
    const { item } = this.props;
    const solidFavorite = favorite ? "fas" : "far";
    const solidWatchlist = watchlist ? "fas" : "far";
    const image_available = !!(item.backdrop_path || item.poster_path);
    return (
        <div className="card">
          <img
            className="card-img-top card-img--height"
            src={
              image_available
                ? `https://image.tmdb.org/t/p/w500${item.backdrop_path ||
                    item.poster_path}`
                : noImageUrl
            }
            alt="poster"
          />
          <div className="card-body">
            <h6 className="card-title">{item.title}</h6>
            <div className="card-text">Рейтинг: {item.vote_average}</div>
            <div className="card-img d-flex justify-content-end">
              <a name="favorite" onClick={this.addToMyList}>
                <FontAwesomeIcon
                  icon={[`${solidFavorite}`, "heart"]}
                  className="card-img--favourite"
                />
              </a>
              <a name="watchlist" onClick={this.addToMyList}>
                <FontAwesomeIcon
                  icon={[`${solidWatchlist}`, "bookmark"]}
                  className="card-img--favourite"
                />
              </a>
            </div>
          </div>
        </div>
    );
  }
}
