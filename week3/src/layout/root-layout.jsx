// root-layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import styled from "styled-components";

const Rootlayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  display: flex;
  flex: 1;
`;
const PageContent = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #000000;
`;

const RootLayout = () => {
  return (
    <Rootlayout>
      <Navbar />
      <Content>
        <Sidebar />
        <PageContent>
          <Outlet />
        </PageContent>
      </Content>
    </Rootlayout>
  );
};

export default RootLayout;
