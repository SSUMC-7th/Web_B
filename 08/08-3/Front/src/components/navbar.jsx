import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navbar = ({ isLoggedIn, userEmail, handleLogout }) => {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const displayName = userEmail ? userEmail.split("@")[0] : "";

  const handleMouseEnter = () => {
    setNotificationOpen(true);
  };

  const handleMouseLeave = () => {
    setNotificationOpen(false);
  };

  const handleNotificationClick = () => {
    navigate("/notify");
  };

  return (
    <NavBarContainer>
      <LogoLink to="/">YONGCHA</LogoLink>
      <NavItems>
        <NotificationIcon
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          🔔
        </NotificationIcon>
        {isNotificationOpen && (
          <NotificationDropdown
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleNotificationClick}
          >
            <NotificationHeader>소식함</NotificationHeader>
            <NotificationItem>
              <span role="img" aria-label="party">
                🎉
              </span>{" "}
              제2회 왓챠 예상 별점 블라인드 시사회 개최
              <NotificationDetail>
                예매는 11/17(일)까지, 지금 신청하세요!
              </NotificationDetail>
              <NotificationDate>6일 전</NotificationDate>
            </NotificationItem>
          </NotificationDropdown>
        )}
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
      </NavItems>
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

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
`;

const NotificationIcon = styled.div`
  cursor: pointer;
  font-size: 24px;
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #333;
  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  width: 300px;
  padding: 10px;
`;

const NotificationHeader = styled.h4`
  font-size: 16px;
  margin-bottom: 10px;
  border-bottom: 1px solid #444;
  padding-bottom: 5px;
`;

const NotificationItem = styled.div`
  padding: 5px 0;
`;

const NotificationDetail = styled.p`
  font-size: 12px;
  color: #aaa;
`;

const NotificationDate = styled.p`
  font-size: 10px;
  color: #777;
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
