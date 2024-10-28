import React from 'react';

function TodoForm({ text, setText, addTodo }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo();
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="todo-input"
            />
            <button type="submit" className="todo-button">할 일 등록</button>
        </form>
    );
}

export default TodoForm;
