import React, { useState } from 'react';
import styled from 'styled-components';
import { validate } from '../hooks/validate';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [inputClick, setInputClick] = useState({
        email: false,
        password: false,
    });
    const isValid = Object.keys(errors).length === 0 && values.email && values.password;

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValues = {
            ...values,
            [name]: value
        };
        setValues(newValues);

        // 실시간 유효성 검사
        const newErrors = validate(newValues);
        setErrors(newErrors);
    };

    const handleFocus = (e) => {
        const { name } = e.target;
        setInputClick((prev) => ({ ...prev, [name]: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            console.log('제출된 데이터:', values);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Title>로그인</Title>
            <Input
                type="email"
                placeholder="이메일을 입력해주세요!"
                value={values.email}
                onChange={handleChange}
                onFocus={handleFocus}

            />
            {inputClick.email && errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            <Input
                type="password"
                placeholder="비밀번호를 입력해주세요!"
                value={values.password}
                onChange={handleChange}
                onFocus={handleFocus}

            />
            {inputClick.password && errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            <SubmitButton type="submit" disabled={!isValid} value="로그인" />
        </Form>
    );
};

export default Login;

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
    margin-bottom: 15px;
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 13px;
    margin-bottom: 10px;
`;

const SubmitButton = styled.input`
    width: 70%;
    max-width: 300px;
    padding: 10px;
    border-radius: 3px;
    border: none;
    background-color: ${({ disabled }) => (disabled ? 'gray' : '#ff3366')};
    color: #fff;
    font-size: 15px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ disabled }) => (disabled ? 'gray' : '#ff0033')};
    }
`;
