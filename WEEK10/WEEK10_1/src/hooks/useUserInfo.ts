import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

interface UserInfo {
  email: string;
}

const fetchUserInfo = async (token: string): Promise<UserInfo> => {
  const response = await axiosInstance.get("http://localhost:3000/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const useUserInfo = (token: string | null) => {
  return useQuery<UserInfo, Error>({
    queryKey: ["userInfo"],
    queryFn: () => fetchUserInfo(token as string),
    enabled: !!token,
  });
};

export default useUserInfo;
