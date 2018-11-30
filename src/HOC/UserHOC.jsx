import React from "react";
import PropTypes from "prop-types";
import CallApi from "../api/api";

const UserContainer = Component =>
  class UserHOC extends React.Component {
    displayName = "UserHOC";

    static propTypes = {
      checkAuthorization: PropTypes.func.isRequired,
      cookies: PropTypes.object.isRequired,
      user: PropTypes.object
    };

    state = {
      popovnerOpen: false
    };

    toggleMenu = () => {
      this.setState({
        popovnerOpen: !this.state.popovnerOpen
      });
    };

    exitFromAccount = bool => async () => {
      const {
        user: { session_id }
      } = this.props;
      if (bool) {
        await CallApi.delete("/authentication/session", {
          body: {
            session_id: session_id
          }
        });
        console.log("EXIT IS SUCCESS");
        this.props.checkAuthorization(null);
        this.props.cookies.remove("session_id");
      } else {
        this.toggleMenu();
      }
    };

    render() {
      const { popovnerOpen } = this.state;
      const {
        user: { user_info }
      } = this.props;
      return (
        <Component
          popovnerOpen={popovnerOpen}
          exitFromAccount={this.exitFromAccount}
          toggleMenu={this.toggleMenu}
          user_info={user_info}
        />
      );
    }
  };

export default UserContainer;
