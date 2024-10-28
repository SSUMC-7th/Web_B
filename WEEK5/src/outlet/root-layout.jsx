import { Outlet } from "react-router-dom";
import styled from 'styled-components';
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

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
