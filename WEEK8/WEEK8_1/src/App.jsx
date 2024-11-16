import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { deleteTodo, getTodoList, postTodo, updateTodo } from './api/api';
import Loading from './style/Loading';
import ErrorAlert from './style/ErrorAlert';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchTodos = async (queryTitle) => {
    setIsLoading(true);
    try {
      const data = await getTodoList({ title: queryTitle });
      setTodos(data[0]);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setErrorMessage('데이터를 불러오는 도중에 에러가 발생했습니다.')
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title || !content) return;
    try {
      const newTodo = await postTodo({ title, content });
      setTodos([...todos, newTodo]);
      setTitle('');
      setContent('');
    } catch (error) {
      setIsError(true);
      setErrorMessage('데이터를 추가하는 도중에 에러가 발생했습니다.')
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo({ id });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      setIsError(true);
      setErrorMessage('데이터를 삭제하는 도중에 에러가 발생했습니다.')
    }
  };

  const handleUpdateTodo = async (id, updatedFields) => {
    try {
      await updateTodo({ id, ...updatedFields });
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo))
      );
    } catch (error) {
      console.error('투두 수정 에러 ', error);
    }
  };

  if (isLoading) return <Loading isLoading={true} />;
  if (isError) return <ErrorAlert message={errorMessage} />;

  return (
    <Router>
      <Container>
        {isError && <ErrorAlert message={errorMessage} />}
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
                  <Button onClick={addTodo}>ToDo 생성</Button>
                </InputContainer>

                <TodoList todos={todos} onUpdate={handleUpdateTodo} onDelete={handleDeleteTodo} />

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

