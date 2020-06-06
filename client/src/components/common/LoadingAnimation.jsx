import React from "react";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

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
      <div className="sweet-loading text-center mb-2">
        <BeatLoader
          css={override}
          size={15}
          color={"#05728f"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default LoadingAnimation;
