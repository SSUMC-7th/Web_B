import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../api/api';
import { useRef, useEffect } from 'react';

const useInfinityQuery = (url) => {
  const bottomRef = useRef(null);

  const fetchCategory = async ({ pageParam = 1 }) => {
    const response = await new Promise((resolve) => {
      setTimeout(async () => {
        const response2 = await api.get(`${url}?language=ko-KR&page=${pageParam}`);
        resolve(response2);
      }, 1000);
    });
    return response.data;
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [url],
    queryFn: fetchCategory,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '100px'
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    bottomRef
  };
};

export default useInfinityQuery;
