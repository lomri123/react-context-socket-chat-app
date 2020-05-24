import React from "react";
import { css } from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class LoadingAnimation extends React.Component {
  state = {
    loading: true,
  };

  render() {
    return (
      <div className="sweet-loading">
        <PropagateLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default LoadingAnimation;
