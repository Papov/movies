import React, { Component } from "react";
import classNames from "classnames";
import { API_KEY_3, fetchUrl } from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "reactstrap";

export default class Icon extends Component {
  state = {
    [this.props.icon_name]: false,
    alert: null
  }
  addToMyList = name => () => {
    const { user } = this.props;
    if (user.session_id) {
      if (!this.state.alert) {
        this.setState(
          {
            [name]: !this.state[name],
            alert: true
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
                [name]: !this.state[name]
              })
            });
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
        );
      }
    } else {
      this.props.toogleLoginForm();
    }
  };
  render(){
    const { favorite, watchlist, alert } = this.state;
    const solidFavorite = favorite ? "fas" : "far";
    const solidWatchlist = watchlist ? "fas" : "far";
    const not_allowed = !!alert;
    const allow = classNames("card-img--favourite", { not_allowed });
    return(
      <a onClick={this.addToMyList("favorite")}>
        <FontAwesomeIcon
          icon={[`${solidFavorite}`, "heart"]}
          className={allow}
        />
      </a>
    {alert ? (
      <Alert className="alert--fixed" color={alert.color}>
        {alert.message}
      </Alert>
    ) : null}
    )
  }
}
