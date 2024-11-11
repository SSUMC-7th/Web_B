import * as S from "./search.style"
import { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchMovieList from "../search/search-movie-list";
import debounce from "lodash.debounce";

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams({ mq: '' });
    const mq = searchParams.get('mq');

    const handleSearchMovie = useCallback(
        debounce(() => {
            if (mq === searchValue) return;
            navigate(`/search?mq=${searchValue}`);
        }, 500),
        [mq, searchValue, navigate]
    );

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
        handleSearchMovie();
    };

    const handleSearchMovieWithKeyboard = (e) => {
        if (e.key === 'Enter') {
            handleSearchMovie.cancel();
            navigate(`/search?mq=${searchValue}`);
        }
    };

    return (
        <>
            <S.SearchContainer>
                <input 
                    placeholder="영화 제목을 입력해주세요..." 
                    value={searchValue} 
                    onChange={onChangeSearchValue}
                    onKeyDown={handleSearchMovieWithKeyboard}
                />
                <button onClick={handleSearchMovie}>검색</button>
            </S.SearchContainer>
            <SearchMovieList />
        </>
    );
};

export default Search;
