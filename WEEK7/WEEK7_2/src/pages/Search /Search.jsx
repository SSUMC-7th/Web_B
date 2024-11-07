import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useCustomFetch from '../../hooks/useCustomFetch';
import useDebounce from '../../hooks/useDebounce';
import SearchInput from './SearchInput';
import SearchList from './SearchList';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams({ mq: '' });
    const mq = searchParams.get('mq');
    const debouncedValue = useDebounce(searchValue, 500);

    const handleSearchMovie = () => {
        if (mq === debouncedValue) return;
        navigate(`/search?mq=${debouncedValue}`);
    };

    useEffect(() => {
        if (debouncedValue) {
            handleSearchMovie();
        }
    }, [debouncedValue]);

    const url = `/search/movie?query=${debouncedValue}&include_adult=false&language=ko-KR&page=1`;
    const { data: movie, isLoading: SearchLoading } = useCustomFetch(url);

    return (
        <SearchContainer>
            <SearchInput
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleSearchMovie={handleSearchMovie}
            />
            <SearchList movie={movie} searchValue={searchValue} loading={SearchLoading} />
        </SearchContainer>
    );
};

export default Search;

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
