import React from "react";
import MovieItem from "../../components/MovieList/MovieItem";
import styled from "styled-components";
import LoadingSpinner from "../../style/SkeletonUI";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

interface SearchListProps {
  movie: Movie[] | undefined;
  searchValue: string;
  loading: boolean;
}

const SearchList: React.FC<SearchListProps> = ({
  movie,
  searchValue,
  loading,
}) => {
  return (
    <MovieContainer>
      {loading ? (
        <LoadingSpinner isLoading={true} />
      ) : movie && movie.length > 0 ? (
        movie.map((movieItem) => (
          <MovieItem key={movieItem.id} movie={movieItem} />
        ))
      ) : (
        <NoText>
          {searchValue
            ? `해당하는 검색어 "${searchValue}"에 해당하는 데이터가 없습니다.`
            : "검색어를 입력해주세요."}
        </NoText>
      )}
    </MovieContainer>
  );
};

export default SearchList;

const MovieContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
  place-items: center;
  min-height: 200px;
  margin-left: 10px;
  margin-right: 20px;
  margin-top: 10px;
`;

const NoText = styled.h1`
  grid-column: span 9;
  font-size: 20px;
  text-align: center;
  color: white;
`;
