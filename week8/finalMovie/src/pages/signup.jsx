import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    passwordCheck: false,
  });

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("올바른 이메일 형식이 아닙니다!")
      .required("이메일을 반드시 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .required("비밀번호를 반드시 입력해주세요."),
    passwordCheck: yup
      .string()
      .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호를 다시 입력해주세요."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { mutate: postSign } = useMutation({
    mutationFn: async (data) => {
      return await axios.post("http://localhost:3000/auth/register", {
        email: data.email,
        password: data.password,
        passwordCheck: data.passwordCheck,
      });
    },
    onSuccess: () => {
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    },
    onError: (error) => {
      if (error.response) {
        console.error("Server error:", error.response.data);
        alert(error.response.data.message || "회원가입에 실패했습니다.");
      } else {
        console.error("Error:", error.message);
        alert("네트워크 오류가 발생했습니다.");
      }
    },
  });

  const onSubmit = (data) => {
    postSign(data);
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    trigger(name);
  };

  const email = watch("email");
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");

  useEffect(() => {
    if (touched.email) trigger("email");
    if (touched.password) trigger("password");
    if (touched.passwordCheck) trigger("passwordCheck");
  }, [email, password, passwordCheck, trigger, touched]);

  console.log(isValid);

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Title>회원가입</Title>

      <Input
        type="email"
        {...register("email")}
        onBlur={() => handleBlur("email")}
        placeholder="이메일을 입력해주세요."
      />
      {touched.email && errors.email && (
        <ErrorText>{errors.email.message}</ErrorText>
      )}

      <Input
        type="password"
        {...register("password")}
        onBlur={() => handleBlur("password")}
        placeholder="비밀번호를 입력해주세요."
      />
      {touched.password && errors.password && (
        <ErrorText>{errors.password.message}</ErrorText>
      )}

      <Input
        type="password"
        {...register("passwordCheck")}
        onBlur={() => handleBlur("passwordCheck")}
        placeholder="비밀번호를 다시 한 번 입력해주세요."
      />
      {touched.passwordCheck && errors.passwordCheck && (
        <ErrorText>{errors.passwordCheck.message}</ErrorText>
      )}

      <BTN type="submit" disabled={!isValid}>
        회원가입
      </BTN>
    </Container>
  );
};

export default SignUpPage;

const Title = styled.h1`
  color: white;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 8px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorText = styled.h1`
  color: red;
  font-size: 12px;
`;

const BTN = styled.button`
  margin: 10px 0;
  padding: 8px;
  width: 320px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${(props) => (props.disabled ? "gray" : "pink")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
