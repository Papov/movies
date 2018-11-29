import React, { Component } from "react";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";
import PropTypes from "prop-types";
import { fetchUrl, api_urls } from "../../api/api";
import { AppContext } from "../App";

class User extends Component {
  static propTypes = {
    checkLogined: PropTypes.func.isRequired,
    cookies: PropTypes.object.isRequired,
    user_info: PropTypes.object
  };

  state = {
    popovnerOpen: false
  };

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };

  exitFromAccount = async event => {
    const { name } = event.target;
    const {user_info} = this.props;
    if (name === "true") {
      const logOut = await fetchUrl(api_urls.logOut, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          session_id: user_info.session_id
        })
      });
      this.props.checkLogined(null);
      this.props.cookies.remove("session_id");
      console.log(logOut);
    } else {
      this.toggle();
    }
  };

  render() {
    const {
      user_info: { user_info }
    } = this.props;
    return (
      <div className="d-flex align-items-center">
        <span className="text-white" style={{ marginRight: "10px" }}>
          {user_info.name}
        </span>
        <img
          className="rounded-circle avatar"
          width="45"
          src={`https://secure.gravatar.com/avatar/${
            user_info.avatar.gravatar.hash
          }.jpg?s=64`}
          alt="avatar"
          id="exit"
          onClick={this.toggle}
        />
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target="exit"
          toggle={this.toggle}
        >
          <PopoverHeader className="text-center">выйти?</PopoverHeader>
          <PopoverBody>
            <button
              type="button"
              className="btn btn--exit btn-success"
              name="true"
              onClick={this.exitFromAccount}
            >
              Да
            </button>
            <button
              type="button"
              className="btn btn--exit btn-danger"
              name="false"
              onClick={this.exitFromAccount}
            >
              Нет
            </button>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

const UserConsumer = props => {
  return (
    <AppContext.Consumer>
      {({ user }) => <User user_info={user} {...props} />}
    </AppContext.Consumer>
  );
};

UserConsumer.displayName = "UserConsumer";

export default UserConsumer;
