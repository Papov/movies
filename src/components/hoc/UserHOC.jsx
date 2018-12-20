import React from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";

const UserHOC = Component => {
  @inject(({ userStore }) => ({
    user: userStore.user,
    popovnerOpen: userStore.popovnerOpen,
    exitFromAccount: userStore.exitFromAccount,
    toggleMenu: userStore.toggleMenu
  }))
  @observer
  class UserHOC extends React.Component {
    static propTypes = {
      onLogOut: PropTypes.func.isRequired,
      user: PropTypes.object
    };

    render() {
      const { user, popovnerOpen, exitFromAccount, toggleMenu } = this.props;
      return (
        <Component
          popovnerOpen={popovnerOpen}
          exitFromAccount={exitFromAccount}
          toggleMenu={toggleMenu}
          user={user}
        />
      );
    }
  }
  return UserHOC;
};

export { UserHOC };
