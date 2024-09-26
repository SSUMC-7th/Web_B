import React, { useState } from "react";
import ToDoItem from "./ToDoItem";

function ToDoList({
  toDos,
  deleteToDo,
  setEditingId,
  editingId,
  updateToDo,
  editText,
  setEditText,
}) {
  return (
    <ul className="todo-list">
      {toDos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          deleteToDo={deleteToDo}
          setEditingId={setEditingId}
          editingId={editingId}
          updateToDo={updateToDo}
          editText={editText}
          setEditText={setEditText}
        />
      ))}
    </ul>
  );
}

export default ToDoList;
