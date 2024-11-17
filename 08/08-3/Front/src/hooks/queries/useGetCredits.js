import { axiosInstance } from "../../api/axios-instance";

const useGetCredits = async ({ movieID }) => {
  const { data } = await axiosInstance.get(
    `/movie/${movieID}/credits?language=ko-KR`
  );

  return data;
};

export { useGetCredits };
