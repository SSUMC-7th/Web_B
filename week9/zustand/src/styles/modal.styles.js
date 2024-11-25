import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 300px;
  text-align: center;
`;

const ModalContent = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border: 1px solid #007bff;
  border-radius: 4px;
  background-color: white;
  color: #007bff;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border: 1px solid #ff4d4f;
  border-radius: 4px;
  background: white;
  color: #ff4d4f;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #ff4d4f;
    color: white;
  }
`;

export {
  ModalContent,
  ModalWrapper,
  CancelButton,
  ConfirmButton,
  ButtonContainer,
};
