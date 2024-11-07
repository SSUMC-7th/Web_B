import React from 'react';
import styled from 'styled-components';

const SearchInput = ({ searchValue, setSearchValue, handleSearchMovie }) => (
    <Form>
        <Input
            type="text"
            placeholder="영화 제목을 입력해주세요.."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
        />
        <SubmitButton type="submit" onClick={handleSearchMovie}>
            제출
        </SubmitButton>
    </Form>
);

export default SearchInput;

const Form = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-left: 10px;
`;

const Input = styled.input`
    flex: 1;
    width: 70%;
    padding: 10px;
    border: 1px solid black;
    border-radius: 6px;
`;

const SubmitButton = styled.button`
    margin-left: 10px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    cursor: pointer;
    background-color: red;
    border: none;
    border-radius: 10px;
    color: white;

    &:hover {
        background-color: green;
    }
`;
