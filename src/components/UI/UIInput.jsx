import React from "react";
import PropTypes from "prop-types";

export default class UIInput extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  };

  render() {
    const {
      id,
      value,
      onChange,
      label,
      onBlur,
      placeholder,
      type,
      error
    } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          className="form-control"
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
}
