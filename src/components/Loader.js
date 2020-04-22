import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled("img")`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  width: 50px;
  animation: ${rotate} 0.6s linear infinite;
  opacity: 0.4;
`;

export default () => {
  return <Loading src={require("../_image/loading.png")} alt="" />;
};
