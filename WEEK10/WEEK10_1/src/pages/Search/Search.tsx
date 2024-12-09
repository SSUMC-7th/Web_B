import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import useDebounce from "../../hooks/useDebounce";
import SearchInput from "./SearchInput";
import SearchList from "./SearchList";
import useCustomFetch2 from "../../hooks/useCustomFetch2";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams({ mq: "" });
  const mq = searchParams.get("mq");
  const debouncedValue = useDebounce<string>(searchValue, 500);

  const handleSearchMovie = () => {
    if (!debouncedValue || mq === debouncedValue) return;
    navigate(`/search?mq=${debouncedValue}`);
  };

  useEffect(() => {
    if (debouncedValue) {
      handleSearchMovie();
    }
  }, [debouncedValue]);

  const url = `/search/movie?query=${debouncedValue}&include_adult=false&language=ko-KR&page=1`;
  const { data: movie, isLoading: SearchLoading } =
    useCustomFetch2<Movie[]>(url);

  return (
    <SearchContainer>
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearchMovie={handleSearchMovie}
      />

      <SearchList
        movie={movie}
        searchValue={searchValue}
        loading={SearchLoading}
      />
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: black;
  min-height: 100vh;
`;
