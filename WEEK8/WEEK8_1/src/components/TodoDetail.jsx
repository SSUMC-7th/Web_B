import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../style/Loading';
import { deleteTodo, getTodoId, updateTodo } from '../api/api';
import styled from 'styled-components';
import ErrorAlert from '../style/ErrorAlert';

const TodoDetail = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchTodo = async () => {
            setIsLoading(true);
            try {
                const response = await getTodoId({ id });
                // console.log('데이터', response);
                setTodo(response);
                setEditTitle(response.title);
                setEditContent(response.content);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
                setIsLoading(false);
                setErrorMessage('데이터를 불러오는 도중에 에러가 발생했습니다.')
            }
        };

        fetchTodo();
    }, [id]);

    const UpdateTodo = async () => {
        try {
            await updateTodo({ id: todo.id, title: editTitle, content: editContent });
            setTodo((prevTodo) => ({
                ...prevTodo,
                title: editTitle,
                content: editContent,
            }));
            setIsEditing(false);
        } catch (error) {
            setIsError(true);
            setErrorMessage('데이터를 수정하는 도중에 에러가 발생했습니다.')
        }
    };

    const DeleteTodo = async () => {
        try {
            await deleteTodo({ id: todo.id });
            navigate('/');
        } catch (error) {
            setIsError(true);
            setErrorMessage('데이터를 삭제하는 도중에 에러가 발생했습니다.')
        }
    };

    if (isLoading) return <Loading isLoading={true} />;
    if (isError) return <ErrorAlert message={errorMessage} />;


    return (
        <Container>
            {isError && <ErrorAlert message={errorMessage} />}
            <ID>id: {todo.id}</ID>
            {isEditing ? (
                <EditMode>
                    <Input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <Text
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />
                    <Button onClick={UpdateTodo}>수정 완료</Button>
                </EditMode>
            ) : (
                <>
                    <TodoTitle>{todo.title}</TodoTitle>
                    <TodoContent>{todo.content}</TodoContent>
                    <DetailContents>
                        <p>Created At: {new Date(todo.createdAt).toLocaleString()}</p>
                        <p>Checked: {todo.checked ? '완료' : '진행중'}</p>
                    </DetailContents>
                    <Button onClick={() => setIsEditing(true)}>수정</Button>
                    <Button onClick={DeleteTodo}>삭제</Button>
                </>
            )}
        </Container>
    );
};

export default TodoDetail;

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ID = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const TodoTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`;

const TodoContent = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #555;
  margin-bottom: 20px;
`;

const DetailContents = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 30px;
`;

const Button = styled.button`
  background-color: #f39c12;;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #865508;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Text = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;
`;

const EditMode = styled.div`
  margin-bottom: 20px;
`;