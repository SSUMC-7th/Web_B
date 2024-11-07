import { Outlet } from "react-router-dom";
import styled from 'styled-components';
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";

const RootLayout = () => {
    return (
        <>
            <Navbar />
            <MainLayout>
                <Sidebar />
                <Content>
                    <Outlet />
                </Content>
            </MainLayout>
        </>
    );
};

export default RootLayout;

const MainLayout = styled.div`
    display: flex;
    height: 100vh;
`;

const Content = styled.div`
    flex: 1; 
`;
