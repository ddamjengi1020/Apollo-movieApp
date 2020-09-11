import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import Movie from "../components/Movie";

const GET_MOVIES = gql`
  query getMovies($rating: Float!) {
    movies(limit: 50, rating: $rating) {
      id
      title
      medium_cover_image
      isLiked @client
    }
  }
`;

const Container = styled.div`
  padding-bottom: 60px;
`;

const Header = styled.div`
  width: 100%;
  height: 350px;
  background-image: linear-gradient(to right, #f53b57, #ffb8b8);
  font-size: 50px;
  font-weight: 700;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Grid = styled.div`
  left: 0;
  right: 0;
  margin: auto;
  margin-top: -40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 35px;
  width: 70%;
  height: 100%;
`;

const Form = styled.form`
  position: absolute;
  top: 40px;
  left: 40px;
`;

const Label = styled.label`
  font-size: 17px;
  font-weight: 500;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin-right: 10px;
  &::after {
    margin-left: 5px;
    content: ":";
  }
`;

const Input = styled.input`
  width: 35px;
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 5px;
  box-shadow: 1px 3px 10px #00000080;
  opacity: 0.7;
  transition: all 0.4s linear;
  &:focus {
    opacity: 1;
  }
`;

export default () => {
  const [currentVal, setVal] = useState(5);
  const [currentRating, setRating] = useState(5);
  let rating = parseFloat(currentRating);
  const { loading, data } = useQuery(GET_MOVIES, {
    variables: { rating },
  });
  const onChange = (e) => {
    e.preventDefault();
    setVal(e.target.value);
  };
  const onSubmit = () => {
    setRating(currentVal);
  };
  return (
    <Container>
      <Header>Apollo movie app</Header>
      <Form onSubmit={onSubmit}>
        <Label htmlFor="rating">Rating</Label>
        <Input
          id="rating"
          type="number"
          min={1}
          max={10}
          step={0.1}
          value={currentVal}
          onChange={onChange}
        />
      </Form>
      {loading && <Loader />}
      <Grid>
        {data?.movies?.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </Grid>
    </Container>
  );
};
