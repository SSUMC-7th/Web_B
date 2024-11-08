import { useState } from 'react';
import styled from 'styled-components';
import LoadingSpinner from '../styles/SkeletonUI';

const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = (totalPages) => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const PaginationStyle = ({ totalPages, isFetching }) => (
    <>
      <PageContainer>
        <PrevButton onClick={handlePrevPage} disabled={page === 1}>
          이전
        </PrevButton>
        <Text>{page} 페이지</Text>
        <NextButton onClick={() => handleNextPage(totalPages)} disabled={page === totalPages}>
          다음
        </NextButton>
      </PageContainer>
      {isFetching && <LoadingSpinner isLoading={isFetching} />}
    </>
  );

  return {
    page,
    handlePrevPage,
    handleNextPage,
    PaginationStyle
  };
};

export default usePagination;

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  gap: 15px;
`;

const PrevButton = styled.button`
  display: flex;
  padding: 10px;
  cursor: pointer;
  background-color: red;
  border: none;
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: #ff5050;
  }

  &:disabled {
    background-color: gray; 
    cursor: not-allowed;
  }
`;

const Text = styled.span`
  font-weight: semi-bold;
`;

const NextButton = styled.button`
  display: flex;
  padding: 10px;
  cursor: pointer;
  background-color: #323232;
  color: white;
  border-radius: 5px;
  border: none;
`;
