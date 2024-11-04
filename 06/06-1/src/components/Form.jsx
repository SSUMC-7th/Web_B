import React from 'react';
import styled from 'styled-components';
import { TodoContext } from "../context/TodoContext"
import { useContext } from "react"

const Form = () => {
    const {
        text, 
        setText, 
        handleSubmit, 
        addTodo, 
    } = useContext(TodoContext);
    return (
        <TodoForm onSubmit={handleSubmit}>
            <TodoInput
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="할 일을 입력하세요"
            />
            <TodoButton onClick={() => addTodo(text)} type="submit">
                할 일 등록
            </TodoButton>
        </TodoForm>
    );
}

export default Form;

const TodoForm = styled.form`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const TodoInput = styled.input`
    flex-grow: 1;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const TodoButton = styled.button`
    padding: 8px 12px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f0f0f0;
    }
`;
