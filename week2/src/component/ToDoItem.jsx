import React, { useState } from "react";

function ToDoItem({
  todo,
  deleteToDo,
  setEditingId,
  editingId,
  updateToDo,
  editText,
  setEditText,
}) {
  return (
    <li className="todo-item ">
      {editingId !== todo.id ? (
        <div className="todo-item-text">
          <p className="todo-item-text-id">{todo.id}. </p>
          <p>{todo.task}</p>
        </div>
      ) : (
        <div className="todo-item-text">
          <p>{todo.id}. </p>
          <input
            defaultValue={todo.task}
            onChange={(e) => setEditText(e.target.value)}
          />
        </div>
      )}
      <div className="todo-item-buttons">
        <button onClick={() => deleteToDo(todo.id)}>삭제하기</button>
        {editingId === todo.id ? (
          <button onClick={() => updateToDo(todo.id, editText)}>
            수정 완료
          </button>
        ) : (
          <button onClick={() => setEditingId(todo.id)}>수정 진행</button>
        )}
      </div>
    </li>
  );
}

export default ToDoItem;
