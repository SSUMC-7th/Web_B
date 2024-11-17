import { axiosInstance } from "../../api/axios-instance";

const useGetDetails = async ({ movieID }) => {
  const { data } = await axiosInstance.get(`/movie/${movieID}?language=ko-KR`);

  return data;
};

export { useGetDetails };
