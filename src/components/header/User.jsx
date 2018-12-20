import React from "react";
import { Popover, PopoverBody } from "reactstrap";
import PropTypes from "prop-types";
import { UserHOC } from "../hoc/UserHOC";

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
        <PopoverBody className="p-0">
          <div className="nav-tabs nav-menu p-1">избранное</div>
          <div className="nav-tabs nav-menu p-1">список просмотра</div>
          <div
            className="nav-tabs nav-menu p-1"
            onClick={exitFromAccount(true)}
          >
            выйти
          </div>
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

export default UserHOC(User);
