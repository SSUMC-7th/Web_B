import { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';


function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: '투두만들어보기' },
    { id: 2, task: '투두만들어보기2' },
  ]);

  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(false);
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    if (text.trim().length === 0) {
      alert('할일을 입력하세요');
      return;
    }
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100) + 2, task: text },
    ]);
    setText('');
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTodo = (id, text) => {
    setTodos((prev) => prev.map((item) => item.id === id ? { ...item, task: text } : item));
    setEditingId('');
    setEditText('');
  };

  return (
    <div className="app">
      <TodoForm text={text} setText={setText} addTodo={addTodo} />
      <TodoList
        todos={todos}
        editingId={editingId}
        setEditingId={setEditingId}
        setEditText={setEditText}
        editText={editText}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default App;
