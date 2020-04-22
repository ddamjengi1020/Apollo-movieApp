import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div``;
const Poster = styled.img`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 7px 13px -3px rgba(110, 110, 110, 0.91);
  -moz-box-shadow: 0px 7px 13px -3px rgba(110, 110, 110, 0.91);
  box-shadow: 0px 7px 13px -3px rgba(110, 110, 110, 0.91);
`;

export default ({ id, medium_cover_image }) => {
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster src={medium_cover_image}></Poster>
      </Link>
    </Container>
  );
};
