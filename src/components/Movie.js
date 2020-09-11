import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const MUTATION_LIKE = gql`
  mutation likeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PContainer = styled.div`
  width: 100%;
  background-color: black;
  border-radius: 11px;
`;

const Poster = styled.img`
  width: 100%;
  float: left;
  border-radius: 10px;
  -webkit-box-shadow: 0px 7px 13px -3px rgba(110, 110, 110, 0.91);
  -moz-box-shadow: 0px 7px 13px -3px rgba(110, 110, 110, 0.91);
  box-shadow: 0px 7px 13px -3px rgba(110, 110, 110, 0.91);
  transition: opacity 0.2s linear;
  &:hover {
    opacity: 0.8;
  }
`;

const Like = styled.button`
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  margin-top: 10px;
  border-radius: 10px;
  background-color: transparent;
  color: black;
  border: none;
  font-size: 20px;
  outline: none;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export default ({ id, medium_cover_image, isLiked }) => {
  const [poster, setPoster] = useState(medium_cover_image);
  const handleError = () => {
    setPoster(require("../_image/404.png"));
  };
  const [handleLike] = useMutation(MUTATION_LIKE, {
    variables: { id: parseInt(id), isLiked },
  });

  return (
    <Container>
      <PContainer>
        <Link to={`/${id}`}>
          <Poster src={poster} onError={handleError}></Poster>
        </Link>
      </PContainer>
      <Like onClick={handleLike}>{isLiked ? "💗" : "🤍"}</Like>
    </Container>
  );
};
