import { useState } from 'react';
import List from "./components/List"
import Form from "./components/Form"
import './App.css'

function App() {

  const [todos, setTodos] = useState([{id: 1, task: '투두 만들어보기'}, {id: 2, task: '하 너무 어렵네'}])
  const [text, setText] = useState('')
  const [editingID, setEditingID] = useState('')
  const [editText, setEditText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const addTodo = () => {
    if (text.trim().length === 0) return;
    setTodos((prev) => [...prev, {id:Math.floor(Math.random() * 100) + 2, task: text}])
    setText('');
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  }

  const updateTodo = (id, text) => {
    setTodos((prev) => prev.map((item) => item.id === id ? {...item, task : text} : item))
    setEditingID('');
    setEditText('');
  }

  return(
    <div className="init_body">
      <Form text={text} handleSubmit={handleSubmit} setText={setText} addTodo={addTodo} className="init_form"></Form>
      <List todos={todos} editingID={editingID} setEditText={setEditText} deleteTodo={deleteTodo} updateTodo={updateTodo} setEditingID={setEditingID} editText={editText}></List>
    </div>  
);
}

export default App;
