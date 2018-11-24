import React, { Component } from "react";

export default class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="d-flex align-items-center">
        <span className="text-white" style={{ marginRight: "10px" }}>
          {user.name}
        </span>
        <img
          className="rounded-circle"
          width="45"
          src={`https://secure.gravatar.com/avatar/${
            user.avatar.gravatar.hash
          }.jpg?s=64`}
          alt="avatar"
        />
      </div>
    );
  }
}
