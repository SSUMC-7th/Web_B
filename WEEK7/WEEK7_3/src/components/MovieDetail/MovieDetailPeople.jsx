import React from "react";
import styled from "styled-components";

const MovieDetailPeople = ({ people }) => {
  return (
    <Container>
      <Title>감독/출현</Title>
      <PeoplesContainer>
        {renderPeople(people)}
      </PeoplesContainer>
    </Container>
  );
};

const renderPeople = (people) => {
  return people.slice(0, 20).map(({ id, profile_path, name }) => (
    <PersonCard key={id}>
      <IMG
        src={`https://image.tmdb.org/t/p/w200${profile_path}`}
        alt={name}
      />
      <Name>{name}</Name>
    </PersonCard>
  ));
};

export default MovieDetailPeople;

const Container = styled.div`
  padding: 20px;
  background-color: #1a1a1a;
`;

const Title = styled.h4`
  color: #f2f2f2;
  margin: 0 0 15px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const PeoplesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

const PersonCard = styled.div`
  background-color: #2c2c2c;
  border-radius: 10px;
  padding: 10px;
  width: 120px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  }
`;

const IMG = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f2f2f2;
  margin-bottom: 10px;
`;

const Name = styled.h4`
  color: #f2f2f2;
  font-size: 16px;
  margin: 0;
`;
