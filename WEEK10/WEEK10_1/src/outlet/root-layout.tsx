import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const RootLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <MainLayout>
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
