import React from "react";
import PropTypes from "prop-types";

const UISelect = ({ id, name, value, onChange, label, children }) => {
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

UISelect.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default UISelect;