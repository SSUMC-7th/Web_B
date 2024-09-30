const todoInput = document.getElementById("todo");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");

todoInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const todoText = todoInput.value;
    if (todoText === "") return;

    const li = document.createElement("li");
    li.textContent = todoText;
    todoList.appendChild(li);

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "완료";
    li.appendChild(completeBtn);
    completeBtn.addEventListener("click", () => {
      if (completeBtn.textContent === "완료") {
        // '완료' 버튼 클릭 시 'doneList'로 이동 및 버튼 텍스트 변경
        doneList.appendChild(li);
        completeBtn.textContent = "삭제";
      } else if (completeBtn.textContent === "삭제") {
        // '삭제' 버튼 클릭 시 항목 삭제
        li.remove();
      }
    });

    todoInput.value = "";
  }
});
