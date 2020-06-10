import React from "react";
import PropTypes from "prop-types";
import { InputIcon } from "./InputIcon";

export const FormInput = ({
  name,
  className,
  value,
  placeholder,
  onInputChange,
  iconName,
  maxLength,
}) => {
  return (
    <div className={`input-group ${className}`}>
      {iconName ? <InputIcon name={iconName} /> : null}
      <input
        type="text"
        name={name}
        className="form-control input_user"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onInputChange(e.target.value)}
        maxLength={maxLength || 20}
      />
    </div>
  );
};

FormInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  inputFunction: PropTypes.func,
};
