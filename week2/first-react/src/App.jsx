import { useState } from "react";
import ToDoForm from "./component/ToDoForm";
import ToDoList from "./component/ToDoList";
import "./App.css";

function App() {
  // 투두리스트, 화면에 출력되는 (추가, 삭제, 수정)
  const [toDos, setToDos] = useState([
    { id: 1, task: "투두 만들어보기" },
    { id: 2, task: "희연 혜원 혜윤 건 찬민" },
  ]);
  //
  const [text, setText] = useState("");
  // 랜더링 방지
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // 1. 추가하기
  const addToDo = () => {
    if (text.trim().length === 0) return;
    setToDos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100) + 2, task: text },
    ]);
    setText("");
  };

  // 2. 삭제하기
  const deleteToDo = (id) => {
    setToDos((prev) => prev.filter((todo) => todo.id !== id));
  };
  // 3. 수정하기
  const [editingId, setEditingId] = useState("");
  const [editText, setEditText] = useState("");
  const updateToDo = (id, text) => {
    setToDos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: text } : item))
    );
    setEditingId(""); // input을 텍스트로 다시 돌려놓기
  };
  return (
    <div className="app-container">
      <ToDoForm text={text} setText={setText} addToDo={addToDo} />
      <ToDoList
        toDos={toDos}
        deleteToDo={deleteToDo}
        setEditingId={setEditingId}
        editingId={editingId}
        updateToDo={updateToDo}
        editText={editText}
        setEditText={setEditText}
      />
    </div>
  );
}

export default App;
