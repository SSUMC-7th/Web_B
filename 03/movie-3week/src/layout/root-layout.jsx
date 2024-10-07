import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Sidebar from "../components/sidebar.jsx";
import styled from "styled-components";

const RootLayout = () => {
    return (
        <Container>
            <StyledNavbar />
            <Main>
                <StyledSidebar />
                <Content>
                    <Outlet />
                </Content>
            </Main>
        </Container>
    );
};

export default RootLayout;

// Styles
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const Main = styled.div`
    display: flex;
    background-color: #000; /* Dark background */
    flex-grow: 1;
`;

const StyledNavbar = styled(Navbar)`
    background-color: #333;
    color: white;
    padding: 10px;
    text-align: center;
`;

const StyledSidebar = styled(Sidebar)`
    width: 200px;
    background-color: #555;
    color: white;
    padding: 20px;
`;

const Content = styled.div`
    flex-grow: 1;
    padding: 0px 20px;
`;