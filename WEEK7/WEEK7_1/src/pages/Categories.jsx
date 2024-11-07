import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import image1 from "../assets/aja.png";
import image2 from "../assets/happy.png";
import image3 from "../assets/monday.png";
import image4 from "../assets/time.png";

const CategoryPage = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, label: "현재 상영중인", image: image1, category: "now_playing" },
    { id: 2, label: "인기있는", image: image2, category: "popular" },
    { id: 3, label: "높은 평가를 받은", image: image3, category: "top_rated" },
    { id: 4, label: "개봉 예정중인", image: image4, category: "upcoming" },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/${category}`);
  };

  return (
    <>
      <Title> 카테고리</Title>
      <CategoryGrid>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            onClick={() => handleCategoryClick(category.category)}
          >
            <CategoryImage src={category.image} alt={category.label} />
            <CategoryOverlay>
              <CategoryLabel>{category.label}</CategoryLabel>
            </CategoryOverlay>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </>
  );
};

export default CategoryPage;

const Title = styled.h1`
  color: black;
  margin-bottom: 40px;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 10px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 0 20px;
`;

const CategoryCard = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 15px;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: scale(1.05);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fit;
  border-radius: 15px;
  transition: filter 0.3s ease;
  &:hover {
    filter: brightness(70%);
  }
`;

const CategoryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 1;
  }
`;

const CategoryLabel = styled.h2`
  color: #fff;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px 20px;
  border-radius: 10px;
`;
