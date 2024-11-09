import React from "react";
import styled from "styled-components";

const PaginationButtons = ({ page, totalPages, onPrev, onNext }) => {
  return (
    <BtnContainer>
      <PrevBtn onClick={onPrev} disabled={page === 1}>
        이전
      </PrevBtn>
      <Text>{page} 페이지</Text>
      <NextBtn onClick={onNext} disabled={page === totalPages}>
        다음
      </NextBtn>
    </BtnContainer>
  );
};

export default PaginationButtons;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrevBtn = styled.button`
  padding: 10px;
  background-color: white;
  border: none;
  color: black;
  border-radius: 5px;
  &:disabled {
    background-color: gray;
  }
`;

const Text = styled.span`
  color: white;
  margin: 0px 20px 0px 20px;
`;

const NextBtn = styled.button`
  padding: 10px;
  background-color: #fa3065;
  color: white;
  border-radius: 5px;
  border: none;
`;
