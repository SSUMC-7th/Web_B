import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const fetchUserInfo = async (token) => {
  const response = await axiosInstance.get('http://localhost:3000/user/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const useUserInfo = (token) => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: () => fetchUserInfo(token),
    enabled: !!token
  });
};

export default useUserInfo;
