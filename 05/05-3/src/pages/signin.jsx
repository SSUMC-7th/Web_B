import styled from "styled-components";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Signin = () => {
    const schema = yup.object().shape({
        email: yup.string().email('유효한 이메일 형식이 아닙니다.').required('이메일을 반드시 입력해주세요.'),
        password: yup.string().min(8, '비밀번호는 8자 이상이어야 합니다.').max(16, '비밀번호는 16자 이하여야 합니다.').required('비밀번호를 반드시 입력해주세요.'),
        verify: yup.string().oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.').required('비밀번호 검증 또한 필수 입력요소입니다.'),
    });

    const { register, handleSubmit, formState: { errors, isValid }, trigger } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        console.log('폼 데이터 제출');
        console.log(data);
    };

    return (
        <>
            <PageContainer>
                <SigninText>회원가입</SigninText>
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
                    <StyledInput
                        placeholder="비밀번호를 다시 입력해주세요!"
                        type="password"
                        {...register("verify")}
                        onBlur={() => trigger("verify")}
                    />
                    <ErrorMessage>{errors.verify?.message}</ErrorMessage>
                    <SubmitButton type="submit" value="제출" disabled={!isValid} />
                </MainContainer>
            </PageContainer>
        </>
    );
};

export default Signin;

const PageContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 100px 0px 0px 0px;
  width: 100%;
  height: 100vh;
  background-color: black;
`;

const MainContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const StyledInput = styled.input`
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
`;

const SubmitButton = styled.input`
  width: 440px;
  padding: 15px;
  border-radius: 8px;
  border: none;
  background-color: ${props => props.disabled ? '#ccc' : '#ff4d4d'};
  color: white;
  font-size: 16px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease, transform 0.3s ease; /* Add transition */

  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : '#6495ED'};
    transform: ${props => props.disabled ? 'none' : 'scale(1.05)'};
`;
  
const SigninText = styled.h1`
  color: white;
  margin-bottom: 30px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;
