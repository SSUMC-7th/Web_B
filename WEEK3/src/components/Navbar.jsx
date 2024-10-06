import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
    const navigate = useNavigate();

    const gotoHome = () => {
        navigate('/');
    }

    const gotoLogin = () => {
        navigate('/login')
    }

    const gotoJoin = () => {
        navigate('/join')
    }


    return (
        <Nav>
            <Logo onClick={gotoHome}> CHACHA </Logo>
            <Usermenu>
                <LoginButton onClick={gotoLogin}>로그인</LoginButton>
                <JoinButton onClick={gotoJoin}> 회원가입 </JoinButton>
            </Usermenu>
        </Nav>
    );
};

export default Navbar;

const Nav = styled.nav`
    background-color: #323232;
    padding: 20px;
    display: flex;
    justify-content: space-between;
`;

const Logo = styled.div`
    display: flex;
    color: red;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    cursor: pointer;
    justify-content: center;
    align-items: center;
`;

const Usermenu = styled.div`
    display: flex;
    gap: 10px;
`;

const LoginButton = styled.button`
    color: white;
    background-color: #323232;
    border: none;
    cursor: pointer;
`;

const JoinButton = styled.button`
    color: white;
    background-color: red;
    cursor: pointer;
    border: none;
    padding: 6px;
    border-radius: 5px;

    &:hover {
    background-color: #FF5050;
  }
`;


