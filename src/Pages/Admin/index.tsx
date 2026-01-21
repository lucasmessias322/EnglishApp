import React, { useState } from "react";
import HeaderComponent from "../../Components/HeaderComponent";
import styled from "styled-components";
import AddText from "./AddText";
import EditText from "./EditText";

type MenuKey = "dashboard" | "addText" | "editText" | "settings";

function Admin() {
  const token = localStorage.getItem("token") || "";
  const [activeMenu, setActiveMenu] = useState<MenuKey>("dashboard");

  const renderContent = () => {
    switch (activeMenu) {
      case "addText":
        return <AddText token={token} />;
      case "editText":
        return <EditText token={token} />;
      case "settings":
        return <div>Settings</div>;
      default:
        return <div>Dashboard</div>;
    }
  };

  return (
    <Container>
      <HeaderComponent bgcolor="#212433" loginSignin admin />

      <Main>
        <SideBar>
          <div className="sidebar-header">
            <h2>Admin Panel</h2>
          </div>

          <SideBarItem
            active={activeMenu === "dashboard"}
            onClick={() => setActiveMenu("dashboard")}
          >
            Dashboard
          </SideBarItem>

          <SideBarItem
            active={activeMenu === "addText"}
            onClick={() => setActiveMenu("addText")}
          >
            Adicionar Textos
          </SideBarItem>

          <SideBarItem
            active={activeMenu === "editText"}
            onClick={() => setActiveMenu("editText")}
          >
            Editar Textos
          </SideBarItem>

          <SideBarItem
            active={activeMenu === "settings"}
            onClick={() => setActiveMenu("settings")}
          >
            Settings
          </SideBarItem>
        </SideBar>

        <Content>{renderContent()}</Content>
      </Main>
      
    </Container>
  );
}

export default Admin;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  display: flex;
  height: calc(100vh - 70px);
`;

const SideBar = styled.aside`
  width: 250px;
  background-color: #212433;
  color: #fff;
  overflow-y: auto;

  .sidebar-header {
    padding: 20px;
    border-bottom: 1px solid #353a52;
  }
`;

const SideBarItem = styled.div<{ active?: boolean }>`
  padding: 12px 20px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#2f3450" : "transparent")};
  border-left: ${({ active }) =>
    active ? "4px solid #6c7bff" : "4px solid transparent"};

  &:hover {
    background-color: #2a2f48;
    color: #cfd4ff;
  }
`;

const Content = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;
