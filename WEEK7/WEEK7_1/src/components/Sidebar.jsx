import React from 'react';
import { FaSearch } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = () => {
    const navigate = useNavigate();

    const gotoSearch = () => {
        navigate('/search')
    }

    const gotoMovie = () => {
        navigate('/movies')
    }

    return (
        <Container>
            <Find onClick={gotoSearch}>
                <FaSearch /> 찾기
            </Find>

            <Movie onClick={gotoMovie}>
                <MdMovie /> 영화
            </Movie>
        </Container>
    )
}

export default Sidebar;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #323232;
    padding: 30px;
    align-items: center;

`;

const Find = styled.div`
    display: flex;
    gap: 10px;
    color: white;
    margin-bottom: 20px;
    cursor: pointer;
`;

const Movie = styled.div`
    display: flex;
    gap: 10px;
    color: white;
    cursor: pointer;
`;
