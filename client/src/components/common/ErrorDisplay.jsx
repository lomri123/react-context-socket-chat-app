import React from "react";
import PropTypes from "prop-types";

export const ErrorDisplay = ({ errorText }) => {
  return (
    <div className="mt-0 p-0 text-center text-danger">{errorText}&nbsp;</div>
  );
};

ErrorDisplay.propTypes = {
  errorText: PropTypes.string,
};
