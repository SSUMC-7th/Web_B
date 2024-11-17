import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { postTodo, getTodoList, deleteTodo, updateTodo } from './api/api';
import Loading from './style/Loading';
import ErrorAlert from './style/ErrorAlert';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';

const App = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const { data: todos, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodoList,
  });


  const { mutate: addTodo } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const { mutate: updateTodoMutation } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const handleAddTodo = () => {
    if (!title || !content) return;
    addTodo({ title, content });
    setTitle('');
    setContent('');
  };

  const handleDeleteTodo = (id) => {
    deleteTodoMutation({ id });
  };

  const handleUpdateTodo = (id, updatedFields) => {
    updateTodoMutation({ id, ...updatedFields });
  };

  if (isLoading) return <Loading isLoading={true} />;
  if (isError) return <ErrorAlert message="데이터를 불러오는 도중에 에러가 발생했습니다." />;

  return (
    <Router>
      <Container>
        <Header>⚡ UMC ToDoList ⚡</Header>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <InputContainer>
                  <Input
                    type="text"
                    placeholder="제목을 입력해주세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="내용을 입력해주세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <Button onClick={handleAddTodo}>ToDo 생성</Button>
                </InputContainer>

                <TodoList
                  todos={todos}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              </>
            }
          />
          <Route path="/todo/:id" element={<TodoDetail />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  color: #f39c12;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: #333;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;
