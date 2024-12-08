import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext.tsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { nickname, logout } = useAuth() || {};

  const handleLogout = () => {
    logout && logout();
    navigate("/");
  };

  const goRecommend = () => {
    navigate("/recommended");
  };

  return (
    <Nav>
      <LeftWrapper>
        <Home>
          <StyledLink to="/">
            <HomeTitle>SONFLIX</HomeTitle>
          </StyledLink>
        </Home>
        <Banner>
          <RecommededBTN onClick={goRecommend}>추천영화</RecommededBTN>
        </Banner>
      </LeftWrapper>
      <AuthLinks>
        {nickname ? (
          <>
            <WelcomeText>안녕하세요, {nickname}님</WelcomeText>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </>
        ) : (
          <>
            <StyledLink to="/login">
              <LoginText>로그인</LoginText>
            </StyledLink>
            <StyledLink to="/signup">
              <JoinText>회원가입</JoinText>
            </StyledLink>
          </>
        )}
      </AuthLinks>
    </Nav>
  );
};

export default Navbar;
const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Banner = styled.div`
  display: flex;
  justify-content: start;
  margin-left: 20px;
  align-items: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

const Nav = styled.div`
  background-color: #131517;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Home = styled.div`
  display: flex;
  justify-content: end;
`;

const AuthLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const HomeTitle = styled.span`
  font-size: 35px;
  color: #fc092d;
  margin-left: 20px;
  display: flex;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
`;

const RecommededBTN = styled.button`
  font-size: 14px;
  color: white;
  background-color: #fa3065;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  margin-left: 100px;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #fa3065;
  }
`;

const LoginText = styled.span`
  font-size: 14px;
  color: white;
  display: flex;
  text-align: center;
`;
const JoinText = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fa3065;
  color: white;
  border-radius: 10px;
  font-size: white;
  text-align: center;
  width: 90px;
  height: 35px;
  &:hover {
    background-color: white;
    color: #fa3065;
  }
`;

const WelcomeText = styled.span`
  font-size: 14px;
  color: white;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const LogoutButton = styled.button`
  font-size: 14px;
  color: white;
  background-color: #fa3065;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #fa3065;
  }
`;
