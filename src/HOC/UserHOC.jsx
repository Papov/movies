import React from "react";
import PropTypes from "prop-types";
import CallApi from "../api/api";

const UserContainer = Component =>
  class UserHOC extends React.PureComponent {
    static propTypes = {
      onLogOut: PropTypes.func.isRequired,
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
      const { session_id } = this.props;
      if (bool) {
        await CallApi.delete("/authentication/session", {
          body: {
            session_id: session_id
          }
        });
        console.log("EXIT IS SUCCESS");
        this.props.onLogOut(null);
      } else {
        this.toggleMenu();
      }
    };

    render() {
      const { popovnerOpen } = this.state;
      const { user } = this.props;
      return (
        <Component
          popovnerOpen={popovnerOpen}
          exitFromAccount={this.exitFromAccount}
          toggleMenu={this.toggleMenu}
          user={user}
        />
      );
    }
  };

export default UserContainer;
