import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const List = ({ todo, fetchTodos }) => {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  const handleEdit = () => {
    setEditingId(todo.id);
    setUpdatedTitle(todo.title);
    setUpdatedContent(todo.content);
  };

  const handleCancel = () => {
    setEditingId(null);
    setUpdatedTitle("");
    setUpdatedContent("");
  };

  const handleUpdate = async () => {
    try {
      const data = { title: updatedTitle, content: updatedContent };
      await axios.patch(
        `${import.meta.env.VITE_TODO_API}/todo/${todo.id}`,
        data
      );
      fetchTodos();
      handleCancel();
    } catch (error) {
      console.error("에러 : ", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_TODO_API}/todo/${todo.id}`);
      fetchTodos();
    } catch (error) {
      console.error("에러 : ", error);
    }
  };

  const handleCheck = async () => {
    try {
      const data = { checked: !todo.checked };
      await axios.patch(
        `${import.meta.env.VITE_TODO_API}/todo/${todo.id}`,
        data
      );
      fetchTodos();
    } catch (error) {
      console.error("에러 : ", error);
    }
  };

  const handleItemClick = () => {
    navigate(`/detail/${todo.id}`);
  };

  return (
    <TodoItem>
      {editingId === todo.id ? (
        <>
          <InputField
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <InputField
            type="text"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <ButtonContainer>
            <EditButton onClick={handleUpdate}>Save</EditButton>
            <DeleteButton onClick={handleCancel}>Cancel</DeleteButton>
          </ButtonContainer>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={handleCheck}
          />
          <h3 onClick={handleItemClick}>{todo.title}</h3>
          <p onClick={handleItemClick}>{todo.content}</p>
          <ButtonContainer>
            <EditButton onClick={handleEdit}>Edit</EditButton>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </ButtonContainer>
        </>
      )}
    </TodoItem>
  );
};

export default List;

const TodoItem = styled.div`
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const EditButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #388e3c;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #d9363e;
  }
`;

const InputField = styled.input`
  margin-top: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
