import React from "react";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";
import PropTypes from "prop-types";
import AppConsumerHOC from "../hoc/AppConsumer";
import UserHOC from "../hoc/UserHOC";

const User = ({ user, popovnerOpen, exitFromAccount, toggleMenu }) => {
  return (
    <div className="d-flex align-items-center">
      <span className="text-white" style={{ marginRight: "10px" }}>
        {user.name}
      </span>
      <img
        className="rounded-circle avatar"
        width="45"
        src={`https://secure.gravatar.com/avatar/${
          user.avatar.gravatar.hash
        }.jpg?s=64`}
        alt="avatar"
        id="exit"
        onClick={toggleMenu}
      />
      <Popover
        placement="bottom"
        isOpen={popovnerOpen}
        target="exit"
        toggle={toggleMenu}
      >
        <PopoverHeader className="text-center">выйти?</PopoverHeader>
        <PopoverBody>
          <button
            type="button"
            className="btn btn--exit btn-success"
            onClick={exitFromAccount(true)}
          >
            Да
          </button>
          <button
            type="button"
            className="btn btn--exit btn-danger"
            onClick={exitFromAccount(false)}
          >
            Нет
          </button>
        </PopoverBody>
      </Popover>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  popovnerOpen: PropTypes.bool.isRequired,
  exitFromAccount: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default AppConsumerHOC(UserHOC(User));
