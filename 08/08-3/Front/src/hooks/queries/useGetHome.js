import { axiosHome } from "../../api/axios-home";

const useGetHome = async () => {
  const { data } = await axiosHome.get(`/movie/changes`);

  return data;
};

export { useGetHome };
