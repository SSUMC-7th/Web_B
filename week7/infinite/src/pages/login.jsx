import styled from "styled-components";
import useForm from "../hooks/use-form";
import { validateLogin } from "../utls/validate";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth() || {}; // AuthContext에서 login 함수 사용
  const navigate = useNavigate();
  const loginForm = useForm({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });

  const handlePressLogin = async () => {
    if (!login) {
      console.error("login 함수가 정의되지 않았습니다.");
      return;
    }

    const success = await login(
      loginForm.values.email,
      loginForm.values.password
    );
    if (success) {
      navigate("/");
    }
  };
  return (
    <Container>
      <Title>로그인</Title>
      <Input
        type="email"
        placeholder="이메일을 입력해주세요"
        {...loginForm.getTextInputProps("email")}
      />
      {loginForm.touched.email && loginForm.error.email && (
        <ErrorText>{loginForm.error.email}</ErrorText>
      )}
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        {...loginForm.getTextInputProps("password")}
      />
      {loginForm.touched.password && loginForm.error.password && (
        <ErrorText>{loginForm.error.password}</ErrorText>
      )}
      <BTN onClick={handlePressLogin}>로그인</BTN>
    </Container>
  );
};

export default LoginPage;

const Title = styled.h1`
  color: white;
`;

const Container = styled.div`
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
  background-color: aliceblue;
`;
