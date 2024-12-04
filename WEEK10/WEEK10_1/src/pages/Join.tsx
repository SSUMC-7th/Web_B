import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
  passwordcheck: string;
}

const Join = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("올바른 이메일 형식이 아닙니다. 다시 확인해주세요!")
      .required("이메일을 반드시 입력해주세요."),
    password: yup
      .string()
      .required("비밀번호를 반드시 입력해주세요.")
      .min(8, "비밀번호는 8~16자 사이로 입력해주세요.")
      .max(16, "비밀번호는 8~16자 사이로 입력해주세요."),
    passwordcheck: yup
      .string()
      .required("비밀번호 검증 또한 필수 입력요소입니다.")
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post("http://localhost:3000/auth/register", {
        email: data.email,
        password: data.password,
        passwordCheck: data.passwordcheck,
      });
      return response.data;
    },
    onSuccess: () => {
      console.log("회원가입 성공");
      navigate("/login");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("회원가입 실패:", error.response?.data?.message);
      } else {
        console.error("회원가입 중 오류 발생:", error.message);
      }
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>회원가입</Title>
      <Input
        type="text"
        placeholder="이메일을 입력해주세요!"
        {...register("email")}
      />
      <ErrorMessage>{errors.email?.message}</ErrorMessage>
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요!"
        {...register("password")}
      />
      <ErrorMessage>{errors.password?.message}</ErrorMessage>
      <Input
        type="password"
        placeholder="비밀번호를 다시 입력해주세요!"
        {...register("passwordcheck")}
      />
      <ErrorMessage>{errors.passwordcheck?.message}</ErrorMessage>
      <SubmitButton
        type="submit"
        value="회원가입"
        disabled={!isValid || mutation.isPending}
      />
    </Form>
  );
};

export default Join;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
`;

const Title = styled.h2`
  color: #fff;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 70%;
  max-width: 300px;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 4px;
  font-size: 14px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.input<{ disabled: boolean }>`
  width: 70%;
  max-width: 300px;
  padding: 10px;
  border-radius: 3px;
  border: none;
  background-color: ${({ disabled }) => (disabled ? "gray" : "#ff3366")};
  color: #fff;
  font-size: 15px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "gray" : "#ff0033")};
  }
`;
