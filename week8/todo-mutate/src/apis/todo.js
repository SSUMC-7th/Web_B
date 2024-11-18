import axiosInstance from "./axiosInstance";

// TODO : TODO 생성

const postToDo = async ({ title, content, checked = false }) => {
  const { data } = await axiosInstance.post(`/todo`, {
    title,
    content,
    checked,
  });

  return data;
};

// TODO: TODO List 가져오기 (title)

const getToDoList = async ({ title }) => {
  let url = `/todo`;
  if (title) {
    url += `?title=${title}`;
  }
  const { data } = await axiosInstance.get(url);

  return data;
};
// TODO : TODO 단건 가져오기

const getDetailToDoList = async ({ id }) => {
  const { data } = await axiosInstance.get(`/todo/${id}`);

  return data;
};

// TODO : TODO 수정하기

const updateToDo = async ({ id, title, content, checked = false }) => {
  const { data } = await axiosInstance.patch(`/todo/${id}`, {
    title,
    content,
    checked,
  });

  return data;
};

// TODO : TODO 삭제하기

const deleteToDo = async ({ id }) => {
  const { data } = await axiosInstance.delete(`/todo/${id}`);

  return data;
};

export { postToDo, getToDoList, getDetailToDoList, updateToDo, deleteToDo };
