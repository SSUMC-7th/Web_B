import { useCallback, useState } from "react";
import * as S from "./search.style.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch.js";
import MovieItem from "../components/MovieItem.jsx";
import SearchMovieList from "../components/search-movie-list.jsx";
import { debounce } from "lodash";

const SearchPage = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({
    mq: "",
  }); // setSearchParams 를 사용 안 하는데 어떻게 searchParams가 업데이트 되지 ? -> useSearchParams가 Navigate로 인해 URL이 바뀔때 자동으로 업데이트.

  const mq = searchParams.get("mq");
  const debouncedNavigate = useCallback(
    debounce((value) => {
      if (value !== mq) navigate(`/search?mq=${value}`);
    }, 500),
    [mq, navigate]
  );
  const onChangeSearchValue = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    debouncedNavigate(value);
  };

  const handleSearchMovieWithKeyboard = (event) => {
    if (event.key === "Enter") {
      debouncedNavigate.flush();
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
        <button onClick={() => debouncedNavigate.flush()}>검색</button>
      </S.SearchContainer>
      <SearchMovieList />
    </>
  );
};

export default SearchPage;
