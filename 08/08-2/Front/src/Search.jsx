import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";

const Search = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");

  const fetchSearchResults = async (searchQuery) => {
    if (!searchQuery) return [];
    const response = await axios.get(
      `${import.meta.env.VITE_TODO_API}/todo?title=${searchQuery}`
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchResults", query],
    queryFn: () => fetchSearchResults(query),
    enabled: !!query,
  });

  useEffect(() => {
    if (data) {
      setSearchResults(data);
    }
  }, [data, setSearchResults]);

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
      {isLoading && <p>Loading...</p>}
      {error && <p>검색 중 에러가 발생했습니다.</p>}
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
