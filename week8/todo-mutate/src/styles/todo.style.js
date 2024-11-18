import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid purple;
  border-radius: 20px;
  margin-bottom: 10px;
  text-align: center;
`;

const SInput = styled.input`
  padding: 10px;
  border: 1px solid purple;
  border-radius: 20px;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
`;

const BTN = styled.button`
  border-radius: 10px;
  border: none;
  padding: 20px;
  cursor: pointer;
`;

const ToDoContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const H1 = styled.h1`
  text-align: center;
`;
const ToDoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ListLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 16px;
  color: #555;
  text-align: center;
`;

export {
  FormContainer,
  Input,
  BTN,
  ToDoContainer,
  ToDoListContainer,
  DetailContainer,
  H1,
  SInput,
  LoadingText,
  LoadingContainer,
  ListLoadingContainer,
};
