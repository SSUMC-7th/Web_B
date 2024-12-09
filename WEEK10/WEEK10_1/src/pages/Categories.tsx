import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import image1 from "../assets/aja.png";
import image2 from "../assets/happy.png";
import image3 from "../assets/monday.png";
import image4 from "../assets/time.png";

interface Category {
  id: number;
  label: string;
  image: string;
  category: string;
  number: string;
}

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();

  const categories: Category[] = [
    {
      id: 1,
      label: "현재 상영중인",
      image: image1,
      category: "now_playing",
      number: "1",
    },
    {
      id: 2,
      label: "인기있는",
      image: image2,
      category: "popular",
      number: "2",
    },
    {
      id: 3,
      label: "높은 평가를 받은",
      image: image3,
      category: "top_rated",
      number: "3",
    },
    {
      id: 4,
      label: "개봉 예정중인",
      image: image4,
      category: "upcoming",
      number: "4",
    },
  ];

  const handleCategoryClick = (category: string): void => {
    navigate(`/${category}`);
  };

  return (
    <PageContainer>
      <Container>
        <Title>카테고리</Title>
        <CategoryGrid>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              onClick={() => handleCategoryClick(category.category)}
            >
              <NumberCircle>{category.number}</NumberCircle>
              <ImageContainer>
                <CategoryImage src={category.image} alt={category.label} />
                <Gradient />
                <CategoryLabel>{category.label}</CategoryLabel>
                <Overlay />
              </ImageContainer>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </Container>
    </PageContainer>
  );
};

export default CategoryPage;

const PageContainer = styled.div`
  background-color: #000;
  min-height: 100vh;
  width: 100%;
`;

const Container = styled.div`
  padding: 24px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 32px;
  font-size: 20px;
  font-weight: bold;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;

const CategoryCard = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const NumberCircle = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 32px;
  height: 32px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  z-index: 10;
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${CategoryCard}:hover & {
    opacity: 1;
  }
`;

const CategoryLabel = styled.h2`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  z-index: 2;
`;
