import React from "react";
import PropTypes from "prop-types";

const UIInput = ({
  id,
  value,
  onChange,
  label,
  onBlur,
  placeholder,
  type,
  error
}) => {
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
};

UIInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

export default UIInput;
