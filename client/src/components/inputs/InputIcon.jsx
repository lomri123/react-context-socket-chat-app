import React from "react";
import PropTypes from "prop-types";

export const InputIcon = ({ name }) => {
  return (
    <div className="input-group-append">
      <span className="input-group-text">
        <i className={`fa fa-${name}`}></i>
      </span>
    </div>
  );
};

InputIcon.propTypes = {
  name: PropTypes.string,
};
