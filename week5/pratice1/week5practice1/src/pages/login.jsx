import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("올바른 이메일 형식이어야합니다.")
      .required("이메일을 반드시 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur", // blur 가 되면 ? -> 랜더링이 일어난다
    // onChange로 바꾸면 -> 어떤 값이 바뀔 때마다 랜더링 된다.
  });

  const onSubmit = (data) => {
    console.log("폼 데이터 제출");
    console.log(data);
  };

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    trigger("email");
    trigger("password");
  }, [email, password, , trigger]);

  const handleBlur = (name) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type={"email"}
        {...register("email")}
        onBlur={() => handleBlur("email")}
        placeholder="이메일을 입력해주세요"
      />
      {touched.email && errors.email && (
        <p style={{ color: "red" }}>{errors.email?.message}</p>
      )}

      <input
        type={"password"}
        {...register("password")}
        onBlur={() => handleBlur("password")}
        placeholder="비밀번호를 입력해주세요"
      />
      {touched.password && errors.password && (
        <p style={{ color: "red" }}>{errors.password?.message}</p>
      )}
      <button type={"submit"}></button>
    </form>
  );
};

export default LoginPage;
