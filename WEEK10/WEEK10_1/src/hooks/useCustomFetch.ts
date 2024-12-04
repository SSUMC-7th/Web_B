import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

interface UseCustomFetchResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
}

const useCustomFetch = <T>(url: string): UseCustomFetchResult<T> => {
  const fetchData = async (): Promise<T> => {
    const response = await api.get(url);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery<T>({
    queryKey: [url],
    queryFn: fetchData,
  });

  return { data, isLoading, isError };
};

export default useCustomFetch;
