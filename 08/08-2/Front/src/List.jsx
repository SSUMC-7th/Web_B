import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";

const List = ({ todo, fetchTodos }) => {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  // 수정 요청
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      await axios.patch(
        `${import.meta.env.VITE_TODO_API}/todo/${todo.id}`,
        data
      );
    },
    onSuccess: () => {
      fetchTodos();
      handleCancel();
    },
    onError: (error) => {
      console.error("수정 에러 : ", error);
    },
  });

  // 삭제 요청
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`${import.meta.env.VITE_TODO_API}/todo/${todo.id}`);
    },
    onSuccess: () => {
      fetchTodos();
    },
    onError: (error) => {
      console.error("삭제 에러 : ", error);
    },
  });

  // 체크 상태 변경 요청
  const checkMutation = useMutation({
    mutationFn: async () => {
      const data = { checked: !todo.checked };
      await axios.patch(
        `${import.meta.env.VITE_TODO_API}/todo/${todo.id}`,
        data
      );
    },
    onSuccess: () => {
      fetchTodos();
    },
    onError: (error) => {
      console.error("체크 에러 : ", error);
    },
  });

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

  const handleUpdate = () => {
    updateMutation.mutate({ title: updatedTitle, content: updatedContent });
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleCheck = () => {
    checkMutation.mutate();
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
