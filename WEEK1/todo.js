document.getElementById("todoInput").addEventListener("keyup", handleKeyUp);

function handleKeyUp(event) {
  if (event.key === "Enter") {
    const newTodo = event.target.value.trim();

    if (newTodo) {
      addTodo(newTodo);
      event.target.value = "";
    }
  }
}

function addTodo(add) {
  const todoList = document.getElementById("todoList");
  const li = document.createElement("li");
  li.textContent = add;

  const completeButton = document.createElement("button");
  completeButton.textContent = "완료";
  completeButton.onclick = function () {
    completeTodo(li);
  };

  li.appendChild(completeButton);
  todoList.appendChild(li);
}

function completeTodo(todo) {
  const doneList = document.getElementById("doneList");
  const li = document.createElement("li");
  li.textContent = todo.firstChild.textContent;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제";
  deleteButton.onclick = function () {
    doneList.removeChild(li);
  };

  li.appendChild(deleteButton);
  doneList.appendChild(li);
  todo.remove();
}
