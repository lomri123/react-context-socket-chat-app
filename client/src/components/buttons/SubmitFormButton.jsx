import React from "react";
import PropTypes from "prop-types";

export const SubmitFormButton = ({ className, text }) => {
  return (
    <button type="submit" name="button" className={`btn ${className}`}>
      {text}
    </button>
  );
};

SubmitFormButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};
