import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("유효한 이메일 형식이 아닙니다.")
      .required("이메일을 반드시 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .required("비밀번호를 반드시 입력해주세요."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      console.log("로그인 성공");
      onLoginSuccess();
      navigate("/");
    },
    onError: (error) => {
      setLoginError("로그인 실패: 사용자 정보를 확인해주세요.");
      console.error(error);
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <PageContainer>
      <LoginText>로그인</LoginText>
      <MainContainer onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          placeholder="이메일을 입력해주세요!"
          type="email"
          {...register("email")}
          onBlur={() => trigger("email")}
        />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <StyledInput
          placeholder="비밀번호를 입력해주세요!"
          type="password"
          {...register("password")}
          onBlur={() => trigger("password")}
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
        <SubmitButton type="submit" value="로그인" disabled={!isValid} />
      </MainContainer>
    </PageContainer>
  );
};

export default Login;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: black;
`;

const MainContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StyledInput = styled.input`
  width: 300px;
  padding: 15px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
`;

const SubmitButton = styled.input`
  width: 330px;
  padding: 15px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#ff4d4d")};
  color: white;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#6495ED")};
    transform: ${(props) => (props.disabled ? "none" : "scale(1.05)")};
  }
`;

const LoginText = styled.h1`
  color: white;
  margin-bottom: 30px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;
