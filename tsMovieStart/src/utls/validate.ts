// { email: "", password: ""}

interface LoginValues {
  email: string;
  password: string;
}

interface LoginErrors {
  email: string;
  password: string;
}

const emailPattern =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

function validateUser(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {
    email: "",
    password: "",
  };

  if (!values.email || emailPattern.test(values.email) === false) {
    errors.email = "올바른 이메일 형식이 아닙니다. 다시 확인해주세요!";
  }

  if (
    !values.password ||
    values.password.length < 8 ||
    values.password.length > 16
  ) {
    errors.password = "비밀번호는 8 - 16자 사이로 입력해주세요!";
  }

  return errors;
}

function validateLogin(values: LoginValues) {
  return validateUser(values);
}

export { validateLogin };
