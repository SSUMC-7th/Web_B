import { useEffect, useState } from 'react';
import api from '../api/api';
import { useQuery } from '@tanstack/react-query';

const useCustomFetch = (url) => {
  const fetchData = async () => {
    const response = await api.get(url);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [url],
    queryFn: fetchData
  });

  return { data, isLoading, isError };
};

export default useCustomFetch;
