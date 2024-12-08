import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  nickname: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [nickname, setNickname] = useState<string | null>(null);

  const postLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    });
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    const userResponse = await axios.get("http://localhost:3000/user/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userNickname = userResponse.data.email.split("@")[0];

    return userNickname;
  };

  const { mutateAsync: loginMutation } = useMutation({
    mutationFn: postLogin,
    onSuccess: (userNickname) => {
      setNickname(userNickname);
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다.");
    },
  });

  const login = async (email: string, password: string) => {
    try {
      await loginMutation({ email, password });
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setNickname(null);
  };

  return (
    <AuthContext.Provider value={{ nickname, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
