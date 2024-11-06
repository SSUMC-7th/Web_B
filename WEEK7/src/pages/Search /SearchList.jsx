import React from 'react';
import MovieItem from '../../components/MovieList/MovieItem';
import styled from 'styled-components';

const SearchList = ({ movie, searchValue, loading }) => (
    <MovieContainer>
        {loading ? (
            <NoText>로딩중입니다</NoText>
        ) : movie?.data?.results?.length > 0 ? (
            movie.data.results.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
            ))
        ) : (
            <NoText>
                {searchValue
                    ? `해당하는 검색어 "${searchValue}"에 해당하는 데이터가 없습니다.`
                    : "검색어를 입력해주세요."
                }
            </NoText>
        )}
    </MovieContainer>
);

export default SearchList;

const MovieContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: auto;
    gap: 15px;
    min-height: 200px;
    place-items: center;
`;

const NoText = styled.h1`
    grid-column: span 9;
    font-size: 20px;
    text-align: center;
    color: #333;
`;
