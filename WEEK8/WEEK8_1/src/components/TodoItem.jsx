import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editContent, setEditContent] = useState(todo.content);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      onUpdate(todo.id, { title: editTitle, content: editContent });
    }
  };

  return (
    <TodoContainer>
      <Checkbox
        type="checkbox"
        checked={todo.checked}
        onChange={() => onUpdate(todo.id, { checked: !todo.checked })}
      />
      {isEditing ? (
        <EditALLContainer>
          <EditContainer>
            <EditInput
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <EditInput
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </EditContainer>
          <Button onClick={toggleEdit}>수정완료</Button>
        </EditALLContainer>
      ) : (
        <ViewContainer>
          <Link to={`/todo/${todo.id}`} style={{ textDecoration: 'none' }}>
            <TextContainer completed={todo.checked}>
              <Title>{todo.title}</Title>
              <Content>{todo.content}</Content>
            </TextContainer>
          </Link>
          <Button onClick={() => setIsEditing(true)}>수정</Button>
          <Button onClick={() => onDelete(todo.id)}>삭제</Button>
        </ViewContainer>
      )}
    </TodoContainer>
  );
};

const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`;

const EditALLContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const EditInput = styled.input`
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const TextContainer = styled.div`
  flex: 1;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  color: ${({ completed }) => (completed ? '#aaa' : '#333')};
`;

const Title = styled.p`
  font-weight: bold;
  margin: 0;
`;

const Content = styled.p`
  margin: 0;
`;

const Button = styled.button`
  padding: 5px;
  font-size: 14px;
  color: #333;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

export default TodoItem;
