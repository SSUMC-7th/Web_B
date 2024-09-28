import { React } from "react";

const Lists = ({ todoData, setTodoData, doneList, setDoneList }) => {
  const handleComplete = (index) => {
    const completeTask = todoData[index];
    setDoneList([...doneList, completeTask]);
    setTodoData(todoData.filter((_, i) => i !== index));
  };

  const handleDelete = (id) => {
    setDoneList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full">
      <form className="flex pt-5 justify-around">
        <h1 className="underline underline-offset-4 decoration-dotted mb-2">
          해야 할 일
        </h1>
        <ul className="space-y-2">
          {todoData.length > 0 ? (
            todoData.map((data, index) => (
              <li key={data.id} className="flex justify-between mb-2">
                <span>{data.title}</span>
                <button
                  className="text-green-500 pl-4"
                  onClick={() => handleComplete(index)}
                >
                  완료
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500">할 일이 없습니다.</p>
          )}
        </ul>
        <h1 className="underline underline-offset-4 decoration-dotted">
          해낸 일
        </h1>
        <ul className="space-y-2">
          {doneList.length > 0 ? (
            doneList.map((data) => (
              <li key={data.id} className="flex justify-between mb-2">
                <span>{data.title}</span>
                <button
                  className="text-red-300 pl-4"
                  onClick={() => handleDelete(data.id)}
                >
                  삭제
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">완료한 일이 없습니다.</p>
          )}
        </ul>
      </form>
    </div>
  );
};

export default Lists;
