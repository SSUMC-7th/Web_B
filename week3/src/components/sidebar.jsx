// components/Sidebar.jsx
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { MdMovie } from "react-icons/md";

const Sidebarst = styled.div`
  width: 250px;
  background-color: #131517;
  color: white;
  padding: 16px;
`;

const MenuItem = styled.div`
  a {
    display: flex;
    align-items: center;
    color: #ffffff;
    text-decoration: none;
    padding: 0.8rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    margin-bottom: 5px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateX(5px);
    }

    svg {
      // icon들
      margin-right: 16px;
      font-size: 18px;
    }
  }
`;
const Sidebar = () => {
  return (
    <Sidebarst>
      <MenuItem>
        <Link to="/search">
          <FaSearch />
          찾기
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/category">
          <MdMovie />
          영화
        </Link>
      </MenuItem>
    </Sidebarst>
  );
};

export default Sidebar;
