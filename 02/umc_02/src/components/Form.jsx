import React, {useState} from 'react'
import './Form.css'

const Form = ({ text, handleSubmit, setText, addTodo }) => {
    return(
        <form onSubmit={handleSubmit} className="todo_form">
            <input type="text" value={text} onChange={(e)=>setText(e.target.value)} className="todo_input"/>
            <button onClick={() => addTodo(text)} type="submit" className="todo_button">할 일 등록</button>
        </form>
    );
}

export default Form;