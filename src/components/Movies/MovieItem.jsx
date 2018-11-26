import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { API_KEY_3, fetchUrl } from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "reactstrap";
//===================================================
const noImageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png";
//===================================================
export default class MovieItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    toogleLoginForm: PropTypes.func.isRequired,
    user: PropTypes.object
  };
  //===================================================
  state = {
    favorite: false,
    watchlist: false,
    alert: null
  };
  //===================================================
  addToMyList = async event => {
    const { name } = event.currentTarget;
    const { user } = this.props;
    //----
    if (user.session_token) {
      if (!this.state.alert) {
        this.setState({
          [name]: !this.state[name],
          alert: true
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
        const alert = {};
        switch (myList.status_code) {
          case 1:
            alert.message = `Фильм добавлен в список ${name}`;
            alert.color = "success";
            break;
          case 12:
            alert.message = `Фильм уже есть в Вашем списке ${name}`;
            alert.color = "success";
            break;
          case 13:
            alert.message = `Фильм удален со списка ${name}`;
            alert.color = "danger";
            break;
          default:
            alert.message = "Неизвестная ошибка, повторите еще раз...";
            alert.color = "danger";
            break;
        }
        this.setState({
          alert
        });
        setTimeout(() => {
          this.setState({
            alert: null
          });
        }, 1500);
      }
    } else {
      this.props.toogleLoginForm();
    }
  };
  //===================================================
  render() {
    const { favorite, watchlist, alert } = this.state;
    const { item } = this.props;
    const solidFavorite = favorite ? "fas" : "far";
    const solidWatchlist = watchlist ? "fas" : "far";
    const not_allowed = !!alert;
    const allow = classNames('card-img--favourite', {not_allowed})
    const image_available = !!(item.backdrop_path || item.poster_path);
    return (
      <Fragment>
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
                  className={allow}
                />
              </a>
              <a name="watchlist" onClick={this.addToMyList}>
                <FontAwesomeIcon
                  icon={[`${solidWatchlist}`, "bookmark"]}
                  className={allow}
                />
              </a>
            </div>
          </div>
        </div>
        {alert ? (
          <Alert className="alert--fixed" color={alert.color}>
            {alert.message}
          </Alert>
        ) : null}
      </Fragment>
    );
  }
}
