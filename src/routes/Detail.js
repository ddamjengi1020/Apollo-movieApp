import React from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../components/Loader";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      description_intro
      year
      language
      rating
      genres
      runtime
      background_image_original
      large_cover_image
    }
  }
`;

const GET_SUGGESTION = gql`
  query getSuggestions($id: Int!) {
    suggestions(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${(props) => props.bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.4;
  width: 100%;
  height: 100vh;
  background-color: black;
`;

const Poster = styled.img`
  height: 500px;
  justify-self: center;
  border-radius: 5px;
  box-shadow: 2px 3px 10px #00000099;
`;

const ContentsContainer = styled.div`
  z-index: 2;
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  width: 70%;
`;
const Contents = styled.div`
  padding: 30px;
`;

const Suggestion = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  margin-top: 20px;
`;

const SLink = styled(Link)`
  max-height: 180px;
  width: fit-content;
  background-color: black;
  border-radius: 5px;
  &:not(:last-child) {
    margin-right: 15px;
  }
`;
const SuggestPoster = styled.img`
  height: 180px;
  border-radius: 5px;
  transition: all 0.2s linear;
  &:hover {
    opacity: 0.5;
  }
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: 600;
  color: white;
  margin-bottom: 25px;
`;
const SubTitle = styled.div`
  width: 100%;
  color: white;
`;

const Genre = styled.span`
  width: fit-content;
  padding: 1px 5px 4px 5px;
  background-color: #ff7979;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  &:not(:last-child) {
    margin-right: 5px;
  }
`;
const Description = styled.div`
  height: 145px;
  overflow-y: auto;
  margin-top: 30px;
  line-height: 1.3;
  font-size: 17px;
`;

export default () => {
  let { id } = useParams();
  id = parseInt(id);
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id },
  });
  const { data: suggestion } = useQuery(GET_SUGGESTION, {
    variables: { id },
  });
  return loading ? (
    <Loader />
  ) : (
    <Container bg={data.movie.background_image_original}>
      <Bg></Bg>
      <ContentsContainer>
        <Contents>
          <Title>{data.movie.title}</Title>
          <SubTitle>
            {data.movie.runtime} min · {data.movie.year} · {data.movie.rating} ·{" "}
            {data.movie.genres.map((genre, i) => (
              <Genre key={i}>{genre}</Genre>
            ))}
            <Description>{data.movie.description_intro}</Description>
          </SubTitle>
          <Suggestion>
            {suggestion?.suggestions?.map((el, i) => (
              <SLink to={`/${el.id}`} key={i}>
                <SuggestPoster src={el.medium_cover_image} alt="" />
              </SLink>
            ))}
          </Suggestion>
        </Contents>
        <Poster src={data.movie.large_cover_image} />
      </ContentsContainer>
    </Container>
  );
};
