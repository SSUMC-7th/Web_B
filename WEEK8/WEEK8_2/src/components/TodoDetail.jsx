import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getTodoId, deleteTodo, updateTodo } from '../api/api';
import styled from 'styled-components';
import Loading from '../style/Loading';
import ErrorAlert from '../style/ErrorAlert';

const TodoDetail = () => {
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: todo, isLoading, isError, error } = useQuery({
        queryKey: ['todo', id],
        queryFn: () => getTodoId({ id }),
    });


    const updateMutation = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            alert('수정 완료!');
        },
    });


    const deleteMutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            navigate('/');
        },
    });

    const handleUpdate = () => {
        updateMutation.mutate({ id: todo.id, title: editTitle, content: editContent });
        setIsEditing(false);
    };

    const handleDelete = () => {
        deleteMutation.mutate(todo.id);
    };

    if (isLoading) return <Loading isLoading={true} />;
    if (isError) return <ErrorAlert message={error?.message || '에러가 발생했습니다.'} />;

    return (
        <Container>
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
                    <Button onClick={handleUpdate}>수정 완료</Button>
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
                    <Button onClick={handleDelete}>삭제</Button>
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