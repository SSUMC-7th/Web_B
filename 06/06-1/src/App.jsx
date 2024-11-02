import styled from 'styled-components';
import List from "./components/List";
import Form from "./components/Form";
import { TodoContext } from "./context/TodoContext"
import { useContext } from "react";

function App() {
  const {
    todos, 
    editingID, 
    setEditingID, 
    text, 
    setText, 
    editText, 
    setEditText, 
    handleSubmit, 
    addTodo, 
    deleteTodo, 
    updateTodo
} = useContext(TodoContext);
  return (
    <AppContainer>
      <Form
        text={text}
        handleSubmit={handleSubmit}
        setText={setText}
        addTodo={addTodo}
      />
      <List
        todos={todos}
        editingID={editingID}
        setEditText={setEditText}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        setEditingID={setEditingID}
        editText={editText}
      />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: 600px;
  margin: 0 auto;
  background-color: lightblue;
  padding: 20px;
  border-radius: 10px;
`;
