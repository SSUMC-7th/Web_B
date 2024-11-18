import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Detail = ({ fetchTodos }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TODO_API}/todo/${id}`
        );
        setTodo(response.data);
        setUpdatedTitle(response.data.title);
        setUpdatedContent(response.data.content);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    fetchTodo();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const data = { title: updatedTitle, content: updatedContent };
      await axios.patch(`${import.meta.env.VITE_TODO_API}/todo/${id}`, data);
      setTodo({ ...todo, title: updatedTitle, content: updatedContent });
      setIsEditing(false);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_TODO_API}/todo/${id}`);
      fetchTodos();
      navigate("/");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  if (!todo) {
    return <p>Loading...</p>;
  }

  return (
    <DetailContainer>
      {isEditing ? (
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
            <DeleteButton onClick={() => setIsEditing(false)}>
              Cancel
            </DeleteButton>
          </ButtonContainer>
        </>
      ) : (
        <>
          <h2>{todo.title}</h2>
          <p>{todo.content}</p>
          <p>Checked: {todo.checked ? "True" : "False"}</p>
          <p>Created At: {new Date(todo.createdAt).toLocaleString()}</p>
          <ButtonContainer>
            <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </ButtonContainer>
        </>
      )}
    </DetailContainer>
  );
};

export default Detail;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
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
