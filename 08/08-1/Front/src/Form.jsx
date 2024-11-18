import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Form = ({ fetchTodos }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextAreaChange = (e) => {
    setContent(e.target.value);
  };

  const postTodo = async () => {
    try {
      const data = { title, content, checked: false };
      await axios.post(`${import.meta.env.VITE_TODO_API}/todo`, data);
      fetchTodos();
      console.log(data);
    } catch (error) {
      console.error("에러 : ", error);
    }
  };

  return (
    <Container>
      <InputBox
        type="text"
        value={title}
        onChange={handleInputChange}
        placeholder="제목을 입력하세요"
      />
      <TextArea
        rows="4"
        value={content}
        onChange={handleTextAreaChange}
        placeholder="내용을 입력하세요"
      />
      <Button onClick={postTodo}>추가하기</Button>
    </Container>
  );
};

export default Form;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const InputBox = styled.input`
  width: 300px;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  width: 300px;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
  resize: none;
  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  width: 330px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;
