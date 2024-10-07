import React, { useState } from "react"
import './List.css'

const List = ({todos, editingID, setEditText, deleteTodo, updateTodo, setEditingID, editText}) => {
    return(
      <div>
        {todos.map((todo, _) =>(
          <div className="todo_list">
            {editingID !== todo.id && (
              <h4 key={todo.id} className="todo_item">
                <span className="todo_task">{todo.id}번 {todo.task}</span> 
                <div className="buttons">
                  <button onClick={() => deleteTodo(todo.id)} className="list_button">삭제</button>
                  <button onClick={() => setEditingID(todo.id)} className="list_button">수정</button>
                </div>
              </h4>
            )}
            {editingID === todo.id && (
              <h4 key={todo.id} className="todo_item">
                <span className="todo_task">
                  <span className="todo_id">{todo.id}번</span> 
                  <input defaultValue={todo.task} onChange={(e) => setEditText(e.target.value)} className="list_input"/>
                </span>
                <div className="buttons">
                  <button onClick={() => deleteTodo(todo.id)} className="list_button">삭제</button>
                  <button onClick={() => updateTodo(editingID, editText)} className="list_button">완료</button>
                </div>
              </h4>
            )}
          </div>
        ))}      
      </div>
      )
}

export default List;