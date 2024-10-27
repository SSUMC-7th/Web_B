import styled from "styled-components";
import useForm from "../hooks/use-form";
import { validateLogin } from "../utls/validate";

const LoginPage = () => {
  const login = useForm({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });

  const handlePressLogin = () => {
    console.log(login.values.email, login.values.password);
  };
  return (
    <Container>
      <Title>로그인</Title>
      <Input
        type={"email"}
        placeholder={"이메일을 입력해주세요"}
        {...login.getTextInputProps("email")}
      />
      {login.touched.email && login.error.email && (
        <ErrorText>{login.error.email}</ErrorText>
      )}
      <Input
        type={"password"}
        placeholder={"비밀번호를 입력해주세요"}
        {...login.getTextInputProps("password")}
      />
      {login.touched.password && login.error.password && (
        <ErrorText>{login.error.password}</ErrorText>
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
