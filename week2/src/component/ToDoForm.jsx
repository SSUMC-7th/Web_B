import React, { useState } from "react";

function ToDoForm({ text, setText, addToDo }) {
  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <input
        className="todo-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="오늘의 할 일은 무엇이 있나요?"
      />
      <button onClick={addToDo}>할 일 등록</button>
    </form>
  );
}

export default ToDoForm;
