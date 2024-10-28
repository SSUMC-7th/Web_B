import styled from "styled-components";

const NotFound = () => {
    return (
        <NonfoundText>너는 찾을 수 없는 페이지 야호~!</NonfoundText>
    );
};

export default NotFound;

const NonfoundText = styled.h1`
    color: white;
`;