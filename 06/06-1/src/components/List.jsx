import { React, useContext } from "react";
import styled from "styled-components";
import { TodoContext } from "../context/TodoContext"

const List = () => {
    const {
        todos, 
        editingID, 
        setEditingID, 
        editText, 
        setEditText, 
        deleteTodo, 
        updateTodo
    } = useContext(TodoContext);
    return (
        <div>
            {todos.map((todo) => (
                <TodoList key={todo.id}>
                    {editingID !== todo.id ? (
                        <TodoItem>
                            <TodoTask>
                                <TodoId>{todo.id}번</TodoId>
                                {todo.task}
                            </TodoTask>
                            <Buttons>
                                <ListButton onClick={() => deleteTodo(todo.id)}>삭제</ListButton>
                                <ListButton onClick={() => setEditingID(todo.id)}>수정</ListButton>
                            </Buttons>
                        </TodoItem>
                    ) : (
                        <TodoItem>
                            <TodoTask>
                                <TodoId>{todo.id}번</TodoId>
                                <ListInput 
                                    defaultValue={todo.task}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                            </TodoTask>
                            <Buttons>
                                <ListButton onClick={() => deleteTodo(todo.id)}>삭제</ListButton>
                                <ListButton onClick={() => updateTodo(editingID, editText)}>완료</ListButton>
                            </Buttons>
                        </TodoItem>
                    )}
                </TodoList>
            ))}
        </div>
    );
};

export default List;

const TodoList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TodoItem = styled.h4`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 6px;
    width: 35rem;
`;

const TodoId = styled.span`
    display: flex;
    width: 5rem;
    padding: 10px;
`;

const TodoTask = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Buttons = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    gap: 5px;
`;

const ListButton = styled.button`
    padding: 8px 12px;
    background-color: #f7f7f7;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e0e0e0;
    }
`;

const ListInput = styled.input`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 0;
`;
