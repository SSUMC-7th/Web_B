import { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Lists from "./components/Lists";

function App() {
  const [todoData, setTodoData] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: value,
    };

    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-4/5 max-w-2xl">
        <div className="flex justify-center mb-3">
          <h1>UMC Study Plan</h1>
        </div>
        <Search handleSubmit={handleSubmit} value={value} setValue={setValue} />
        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
          doneList={doneList}
          setDoneList={setDoneList}
        />
      </div>
    </div>
  );
}

export default App;
