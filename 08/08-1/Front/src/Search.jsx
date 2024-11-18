import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import styled from "styled-components";

const Search = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");

  const fetchSearchResults = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TODO_API}/todo?title=${searchQuery}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("에러 : ", error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchSearchResults(query);
  }, [query, fetchSearchResults]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="찾고 싶은 투두가 있나요?"
        value={query}
        onChange={handleInputChange}
      />
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SearchInput = styled.input`
  width: 315px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #007bff;
  }
`;
