import React from 'react';
import TodoItem from './TodoItem';
import styled from 'styled-components';

const TodoList = ({ todos, onUpdate, onDelete }) => {
    return (
        <TodoLists>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
        </TodoLists>
    );
};

export default TodoList;

const TodoLists = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;