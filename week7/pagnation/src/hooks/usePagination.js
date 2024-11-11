import { useState } from "react";

const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = (totalpage = 1) => {
    // 기본값 1로 설정
    setPage((prev) => Math.min(prev + 1, totalpage || 1)); // undefined일 때 1로 제한
  };

  return { page, handlePrevPage, handleNextPage };
};

export default usePagination;
