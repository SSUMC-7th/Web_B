import axiosInstance from "./axiosInstance";

export const postTodo = async ({ title, content, checked = false }) => {
  const { data } = await axiosInstance.post("/todo", {
    title,
    content,
    checked,
  });

  return data;
};

export const getTodoList = async ({ title }) => {
  let url = "/todo";

  if (title) {
    url += `?title=${title}`;
  }
  const { data } = await axiosInstance.get(url);
  return data;
};

export const getTodoId = async ({ id }) => {
  const { data } = await axiosInstance.get(`/todo/${id}`);
  return data;
};

export const updateTodo = async ({ id, title, content, checked }) => {
  const { data } = await axiosInstance.patch(`/todo/${id}`, {
    title,
    content,
    checked,
  });
  return data;
};

export const deleteTodo = async ({ id }) => {
  const { data } = await axiosInstance.delete(`/todo/${id}`);
  return data;
};
