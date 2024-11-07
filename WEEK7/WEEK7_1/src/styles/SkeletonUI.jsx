import styled, { keyframes } from "styled-components";

const skeletonAnimation = keyframes`
  0% {
    background-position: -200%;
  }
  100% {
    background-position: 200%;
  }
`;

const Skeleton = styled.div`
  display: inline-block;
  background: linear-gradient(90deg, #333 25%, #333 50%, #333 75%);
  background-size: 200% 100%;
  animation: ${skeletonAnimation} 1.5s infinite ease-in-out;
  border-radius: 4px;
  height: ${({ height }) => height || "20px"};
  width: ${({ width }) => width || "100%"};
`;

export default Skeleton;
