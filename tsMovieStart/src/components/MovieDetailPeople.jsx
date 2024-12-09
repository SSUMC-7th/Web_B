import React from "react";
import styled from "styled-components";

const MovieDetailPeople = ({ people }) => {
  return (
    <>
      <Subh4>감독/출현</Subh4>
      <PeoplesContainer>
        {people.slice(0, 20).map((person) => (
          <PeopleContainer key={person.id}>
            <IMG
              src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
            />
            <Name>{person.name}</Name>
          </PeopleContainer>
        ))}
      </PeoplesContainer>
    </>
  );
};

export default MovieDetailPeople;

// 스타일링
const Subh4 = styled.h4`
  color: white;
  margin: 10px 0;
  font-size: 18px;
  font-weight: 500;
`;

const PeoplesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: auto;
  gap: 20px;
  justify-content: center;
`;

const PeopleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IMG = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
`;

const Name = styled.h4`
  color: white;
`;
