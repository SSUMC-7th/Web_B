import React from 'react';

function TodoList({ todos, editingId, setEditingId, setEditText, editText, deleteTodo, updateTodo }) {
    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <div key={todo.id} className="todo-item">
                    <div className="todo-content">
                        {editingId !== todo.id ? (
                            <>
                                <p className="todo-id">{todo.id}</p>
                                <p className="todo-task">{todo.task}</p>
                            </>
                        ) : (
                            <input
                                defaultValue={todo.task}
                                onChange={(e) => setEditText(e.target.value)}
                                className="edit-input"
                            />
                        )}
                    </div>
                    <div className="todo-buttons">
                        {editingId === todo.id ? (
                            <button onClick={() => updateTodo(editingId, editText)} className="todo-button">수정 완료</button>
                        ) : (
                            <button onClick={() => setEditingId(todo.id)} className="todo-button">수정 진행</button>
                        )}
                        <button onClick={() => deleteTodo(todo.id)} className="todo-button">삭제하기</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TodoList;
