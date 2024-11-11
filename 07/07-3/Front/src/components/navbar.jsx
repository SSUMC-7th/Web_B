import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = ({ isLoggedIn, userEmail, handleLogout }) => {
    const displayName = userEmail ? userEmail.split('@')[0] : '';

    return (
        <NavBarContainer>
            <LogoLink to="/">YONGCHA</LogoLink>
            {isLoggedIn ? (
                <UserSection>
                    <WelcomeMessage>{displayName}님 반갑습니다.</WelcomeMessage>
                    <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                </UserSection>
            ) : (
                <AuthButtons>
                    <LoginLink to="/login">로그인</LoginLink>
                    <SignupLink to="/signin">회원가입</SignupLink>
                </AuthButtons>
            )}
        </NavBarContainer>
    );
};

export default Navbar;

const NavBarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #111;
    padding: 10px 20px;
    color: white;
`;

const LogoLink = styled(Link)`
    font-size: 24px;
    font-weight: bold;
    color: red;
`;

const AuthButtons = styled.div`
    display: flex;
    gap: 10px;
`;

const LoginLink = styled(Link)`
    background-color: transparent;
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    cursor: pointer;
    &:hover {
        background-color: #e50914;
        color: white;
    }
`;

const SignupLink = styled(Link)`
    background-color: red;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 20px;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: red;
    }
`;

const UserSection = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const WelcomeMessage = styled.span`
    color: white;
`;

const LogoutButton = styled.button`
    background-color: transparent;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 20px;
    cursor: pointer;
    &:hover {
        background-color: #e50914;
        color: white;
    }
`;
