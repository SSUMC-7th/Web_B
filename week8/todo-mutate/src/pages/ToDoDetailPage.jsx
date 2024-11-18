import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import * as S from "../styles/todo.style.js";
import { getDetailToDoList, updateToDo } from "../apis/todo";
import { queryClient } from "../main";
import { FadeLoader } from "react-spinners";

function ToDoDetailPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    data: todo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => getDetailToDoList({ id }),
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createAt, setCreateAt] = useState("");

  const { mutate: updateMutation } = useMutation({
    mutationFn: updateToDo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todo", id]);
      alert("수정이 완료되었습니다!");
    },
  });

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setContent(todo.content);
      setCreateAt(todo.createdAt.slice(0, 19));
    }
  }, [todo]);

  const handleUpdate = () => {
    updateMutation({ id, title, content });
  };

  if (isLoading) {
    return (
      <S.LoadingContainer>
        <FadeLoader color="#36d7b7" />
        <S.LoadingText>게시글을 불러오는 중입니다...</S.LoadingText>
      </S.LoadingContainer>
    );
  }
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <S.DetailContainer>
      <S.H1>ToDo 수정 페이지</S.H1>
      <S.Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <S.Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
      />
      <S.H1>{createAt}</S.H1>
      <S.BTN onClick={handleUpdate}>수정 완료</S.BTN>
      <S.BTN onClick={() => navigate(`/`)}>뒤로가기</S.BTN>
    </S.DetailContainer>
  );
}

export default ToDoDetailPage;
