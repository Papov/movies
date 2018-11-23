import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class UISelect extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  };
  //===================================================
  render() {
    const { id, name, value, onChange, label, children } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <select
          className="form-control"
          id={id}
          value={value}
          onChange={onChange}
          name={name}
        >
          {children}
        </select>
      </div>
    );
  }
}
