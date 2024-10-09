import { useEffect, useState } from "react";
import axiosInstance from "../apis/axios-instance";

const useCustomFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoaing] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaing(true);
      try {
        const response = await axiosInstance.get(url);
        setData(response);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoaing(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, isError };
};

export default useCustomFetch;
