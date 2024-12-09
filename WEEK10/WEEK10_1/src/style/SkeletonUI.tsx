import React from "react";
import { BeatLoader } from "react-spinners";
import styled from "styled-components";

interface LoadingSpinnerProps {
  isLoading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <SpinnerWrapper>
        <BeatLoader color="#9747FF" size={15} margin={10} />
      </SpinnerWrapper>
    );
  }

  return;
};

export default LoadingSpinner;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
