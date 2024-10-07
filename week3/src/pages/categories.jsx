import { Link } from "react-router-dom";
import styled from "styled-components";
import category1 from "../assets/images/category1.webp";
import category2 from "../assets/images/category2.webp";
import category3 from "../assets/images/category3.webp";
import category4 from "../assets/images/category4.webp";

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const CategoryList = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px 0;
`;

const CategoryImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 비율을 유지하면서 컨테이너에 맞추기 */
  border-radius: 10px;
`;

const Categories = styled.div`
  width: 300px;
  height: 150px;
  position: relative;
  overflow: hidden; /* 컨테이너를 넘는 이미지는 자르기 */
`;

const CategoryText = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5px 10px;
  border-radius: 5px;
`;

const CategoryPage = () => {
  const categories = [
    {
      id: 1,
      label: "현재 상영중인",
      image: category1,
      category: "now_playing",
    },
    { id: 2, label: "인기있는", image: category2, category: "popular" },
    {
      id: 3,
      label: "높은 평가를 받은",
      image: category3,
      category: "top_rated",
    },
    { id: 4, label: "개봉 예정중인", image: category4, category: "upcoming" },
  ];
  return (
    <>
      <Title>카테고리</Title>
      <CategoryList>
        {categories.map((category) => (
          <Categories key={category.id}>
            <Link to={`/movies/${category.category}`}>
              <CategoryImg src={category.image} alt={`${category.category}`} />
              <CategoryText>{category.label}</CategoryText>
            </Link>
          </Categories>
        ))}
        {/* <Categories>
          <Link to="/movies/now_playing">
            <CategoryImg src={category1} alt="Now Playing" />
            <CategoryText>현재 상영중인</CategoryText>
          </Link>
        </Categories>
        <Categories>
          <Link to="/movies/popular">
            <CategoryImg src={category2} alt="Popular" />
            <CategoryText>인기있는</CategoryText>
          </Link>
        </Categories>
        <Categories>
          <Link to="/movies/top_rated">
            <CategoryImg src={category3} alt="Top Rated" />
            <CategoryText>높은 평가를 받은</CategoryText>
          </Link>
        </Categories>
        <Categories>
          <Link to="/movies/upcoming">
            <CategoryImg src={category4} alt="Upcoming" />
            <CategoryText>개봉 예정중인</CategoryText>
          </Link>
        </Categories> */}
      </CategoryList>
    </>
  );
};

export default CategoryPage;
