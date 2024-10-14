import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";
import { MdMovie } from "react-icons/md";

const Sidebar = () => {
    return (
        <SidebarContainer>
            <NavItem>
                <IoMdSearch />
                <StyledLink to='search'>찾기</StyledLink>
            </NavItem>
            <NavItem>
                <MdMovie/>
                <StyledLink to='category'>영화</StyledLink>
            </NavItem>
        </SidebarContainer>
    );
};

export default Sidebar;

const SidebarContainer = styled.nav`
    display: flex;
    flex-direction: column;
    background-color: #111;
    padding: 20px 150px 40px 20px;
    height: 100vh;
`;

const NavItem = styled.div`
    display: flex;
    justify-items: center;
    margin-bottom: 20px;
    color: white;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 18px;
    padding : 0px 0px 0px 10px;
    &:hover {
        color: red;
    }
`;
