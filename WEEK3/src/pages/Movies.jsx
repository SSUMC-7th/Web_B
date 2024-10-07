import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import image1 from "../assets/fighting.jpg";
import image2 from "../assets/happy.png";
import image3 from "../assets/monday.jpg";
import image4 from "../assets/time.jpg";

const Movies = () => {
    const list = [
        { id: 1, label: "현재 상영중인", image: image1, category: "now_playing" },
        { id: 2, label: "인기있는", image: image2, category: "popular" },
        { id: 3, label: "높은 평가를 받은", image: image3, category: "top_rated" },
        { id: 4, label: "개봉 예정중인", image: image4, category: "upcoming" }
    ];

    return (
        <Container>
            <Title> 카테고리 </Title>
            <CardList>
                {list.map((category) =>
                    <Cards key={category.id} to={`/movies/${category.category}`}>
                        <CardImage src={category.image} alt={category.label} />
                        <CardLabel className='label'>{category.label}</CardLabel>
                    </Cards>
                )}
            </CardList>
        </Container>
    )
}

export default Movies;

const Container = styled.div`
    padding: 20px;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const CardList = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: start;
    flex-wrap: wrap;
`;

const Cards = styled(Link)`
    width: 280px;
    height: 150px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
`;

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
    transition: filter 0.3s ease;
`;

const CardLabel = styled.div`
    color: white;
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
`;