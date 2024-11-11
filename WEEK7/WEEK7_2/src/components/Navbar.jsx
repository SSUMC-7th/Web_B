import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useUserInfo from "../hooks/useUserInfo";

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showUsername, setShowUsername] = useState('');

    const token = localStorage.getItem('AccessToken');
    const { data: userInfo, isError, isLoading: userInfoLoading } = useUserInfo(token);

    useEffect(() => {
        if (userInfo) {
            setIsLoggedIn(true);
            const { email } = userInfo;
            const nickname = email.split('@')[0];
            setShowUsername(nickname);
        } else {
            setIsLoggedIn(false);
            setShowUsername('');
        }
    }, [userInfo]);


    if (userInfoLoading) return <div>로딩 중...</div>;
    if (isError) return <div>유저 정보를 불러오는 중 에러가 발생했습니다.</div>;

    const handleLogout = () => {
        localStorage.removeItem('AccessToken');
        setIsLoggedIn(false);
        setShowUsername('');
        console.log('로그아웃 성공');
        navigate('/login');
    };

    const gotoHome = () => {
        navigate('/');
    };

    const gotoLogin = () => {
        navigate('/login');
    };

    const gotoJoin = () => {
        navigate('/join');
    };

    return (
        <Nav>
            <Logo onClick={gotoHome}> CHACHA </Logo>
            <Usermenu>
                {isLoggedIn ? (
                    <>
                        <UserName>{showUsername}님 안녕하세요</UserName>
                        <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
                    </>
                ) : (
                    <>
                        <LoginButton onClick={gotoLogin}>로그인</LoginButton>
                        <JoinButton onClick={gotoJoin}>회원가입</JoinButton>
                    </>
                )}
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

const UserName = styled.div`
    color: white;
    border: none;
    margin-top: 3px;
    font-weight: bold;
    font-size: 14px;
`;
