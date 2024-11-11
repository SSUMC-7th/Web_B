import * as S from "./card-skeleton.style.js";

const CardSkeletion = () => {
  return (
    <S.Container>
      <S.CardMain />
      <S.TextWrapper>
        <S.TitleBox />
        <S.DescriptionBox />
      </S.TextWrapper>
    </S.Container>
  );
};

export default CardSkeletion;
