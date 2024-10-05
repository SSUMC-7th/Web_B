import { Link } from "react-router-dom";
import styled from "styled-components";

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

const Navbar = () => {
  return (
    <Nav>
      <Home>
        <StyledLink to="/">
          <HomeTitle>SONFLIX</HomeTitle>
        </StyledLink>
      </Home>
      <AuthLinks>
        <StyledLink to="/login">
          <LoginText>로그인</LoginText>
        </StyledLink>
        <StyledLink to="/signup">
          <JoinText>회원가입</JoinText>
        </StyledLink>
      </AuthLinks>
    </Nav>
  );
};

export default Navbar;
