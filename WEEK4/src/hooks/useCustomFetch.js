import { useEffect, useState } from 'react';
import api from '../api/api';

const useCustomFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoaing] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaing(true);
      try {
        const response = await api.get(url);
        setData(response);
      } catch (error) {
        setIsError(true);
      }
      setIsLoaing(false);
    };
    fetchData();
  }, [url]);

  return { data, isLoading, isError };
};

export default useCustomFetch;
