import React from "react";
import styled from "styled-components";
import List from "./List";

const Lists = ({ todos, fetchTodos }) => {
  const todoItems = todos[0] || [];

  if (!todoItems.length) {
    return (
      <NothingContainer>
        지금은 투두가 없어요! 더 많은 투두를 채워주세요!
      </NothingContainer>
    );
  }

  return (
    <ListContainer>
      {todoItems.map((todo) => (
        <List key={todo.id} todo={todo} fetchTodos={fetchTodos} />
      ))}
    </ListContainer>
  );
};

export default Lists;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const NothingContainer = styled.div`
  margin-top: 20px;
  flex-direction: column;
  display: flex;
  align-items: center;
`;
