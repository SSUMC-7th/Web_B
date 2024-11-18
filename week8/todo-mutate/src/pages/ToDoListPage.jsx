import { useEffect, useState } from "react";
import * as S from "../styles/todo.style.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteToDo, getToDoList, postToDo, updateToDo } from "../apis/todo.js";
import { debounce } from "lodash";
import { queryClient } from "../main.jsx";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

function ToDoListPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const [upDateId, setUpDateId] = useState(0);
  const [upDateTitle, setUpDateTitle] = useState("");
  const [upDateContent, setUpDateContent] = useState("");

  const navigate = useNavigate();

  const { mutate: postToDoMutation } = useMutation({
    mutationFn: postToDo,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      console.log("항상 실행됩니다.");
    },
  });

  const { mutate: deleteToDoMutation } = useMutation({
    mutationFn: deleteToDo,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      console.log("삭제 요청이 보내졌습니다.");
    },
  });

  const { mutate: patchToDoMutation } = useMutation({
    mutationFn: updateToDo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });

      setUpDateId(0);
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      console.log("업데이트 요청이 보내졌습니다.");
    },
  });

  const handleEdit = (todo) => {
    setUpDateId(todo.id);
    setUpDateTitle(todo.title);
    setUpDateContent(todo.content);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeText = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postToDoMutation({ title, content });
  };

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const handler = debounce(() => {
      setDebounceSearch(search);
    }, 500);

    handler();

    return () => handler.cancel();
  }, [search]);

  const {
    data: toDos,
    error,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["todos", debounceSearch],
    queryFn: () => getToDoList({ title: debounceSearch }),
  });

  if (isError) {
    return <div>에러 발생..</div>;
  }
  return (
    <>
      <S.H1>ToDo 검색</S.H1>
      <S.SInput
        placeholder="검색할 제목을 입력하세요."
        value={search}
        onChange={onChangeSearch}
      />
      <S.FormContainer onSubmit={handleSubmit}>
        <S.Input
          name="title"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={onChangeTitle}
        />
        <S.Input
          name="content"
          placeholder="내용을 입력하세요."
          value={content}
          onChange={onChangeText}
        />
        <S.BTN type="submit">투두 생성</S.BTN>
      </S.FormContainer>

      {isFetching ? (
        <S.ListLoadingContainer>
          <FadeLoader color="#36d7b7" />
          <S.LoadingText>게시글을 불러오는 중입니다...</S.LoadingText>
        </S.ListLoadingContainer>
      ) : (
        <S.ToDoListContainer>
          {toDos[0]?.map((todo) => (
            <S.ToDoContainer key={todo.id}>
              <input
                type="checkbox"
                defaultChecked={todo.checked}
                onChange={(e) =>
                  patchToDoMutation({ id: todo.id, checked: !todo.checked })
                }
              />
              {todo.id !== upDateId ? (
                <div>
                  <p>{todo.title}</p>
                  <p>{todo.content}</p>
                </div>
              ) : (
                <div>
                  <input
                    value={upDateTitle}
                    onChange={(e) => setUpDateTitle(e.target.value)}
                  />
                  <input
                    value={upDateContent}
                    onChange={(e) => setUpDateContent(e.target.value)}
                  />
                </div>
              )}

              <button onClick={() => deleteToDoMutation({ id: todo.id })}>
                삭제하기
              </button>
              {todo.id !== upDateId ? (
                <button onClick={() => handleEdit(todo)}>수정 하기</button>
              ) : (
                <button
                  onClick={() =>
                    patchToDoMutation({
                      title: upDateTitle ? upDateTitle : todo.title,
                      content: upDateContent ? upDateContent : todo.content,
                      id: todo.id,
                    })
                  }
                >
                  수정 완료
                </button>
              )}
              <button onClick={() => navigate(`/todo/${todo.id}`)}>
                상세 보기
              </button>
            </S.ToDoContainer>
          ))}
        </S.ToDoListContainer>
      )}
    </>
  );
}

export default ToDoListPage;
