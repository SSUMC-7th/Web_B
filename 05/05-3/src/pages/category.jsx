import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import category1 from "../assets/images/category1.jpg";
import category2 from "../assets/images/category2.jpg";
import category3 from "../assets/images/category3.jpg";
import category4 from "../assets/images/category4.jpg";

const Category = () => {
  return (
    <>
      <CategoryText>카테고리</CategoryText>
      <StyledLink to="/now-playing">
        <img src={category1} alt="현재 상영중인" />
      </StyledLink>
      <StyledLink to="/popular">
        <img src={category2} alt="인기있는" />
      </StyledLink>
      <StyledLink to="/top-rated">
        <img src={category3} alt="높은 평가를 받은" />
      </StyledLink>
      <StyledLink to="/up-coming">
        <img src={category4} alt="개봉 예정중인" />
      </StyledLink>
      <Outlet />
    </>
  );
};

export default Category;

const CategoryText = styled.h1`
  color: white;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  &:hover {
    color: red;
  }

  img {
    width: 300px; /* 이미지 크기 조정 */
    height: auto;
    border-radius: 10px; /* 이미지에 약간의 테두리 둥글림 */
    transition: transform 0.3s; /* 이미지에 마우스를 올렸을 때 효과 */
  }

  img:hover {
    transform: scale(1.1); /* 마우스를 올렸을 때 확대 */
  }
`;
