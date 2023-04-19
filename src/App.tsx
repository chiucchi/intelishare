import "antd/dist/reset.css";

import "./App.css";
import { Avatar, Divider, Layout, Menu, Space, Typography } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  FileAddOutlined,
  NotificationOutlined,
  LogoutOutlined,
  ContainerOutlined,
} from "@ant-design/icons";

import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Investigationlist from "./pages/investigations/InvestigationList";
import PageHome from "./pages/home/PageHome";
import InvestigationsAdd from "./pages/investigations/create/InvestigationsAdd";
import Notifications from "./pages/notifications/Notifications";
import Profile from "./pages/profile/Profile";

function App({ children }: { children: React.ReactNode }) {
  const { Content, Sider } = Layout;
  const navigate = useNavigate();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          width: "20vw",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "#153D50",
          paddingTop: "16px",
        }}
      >
        <Space
          direction="vertical"
          size="middle"
          style={{ marginLeft: "16px", cursor: "pointer" }}
          onClick={() => {
            navigate("profile");
          }}
        >
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#D9D9D9" }}
          />
          <Space direction="vertical">
            <Typography.Title level={5} style={{ color: "#f0f0f0" }}>
              John Doe
            </Typography.Title>
            <Typography.Text type="secondary" style={{ color: "#f0f0f0" }}>
              john@doe.com
            </Typography.Text>
          </Space>
        </Space>
        <Divider />
        <Menu
          onClick={({ key }) => {
            if (key !== "logout") {
              navigate("/" + key);
            } else {
              // TODO: logout
              console.log("logout");
            }
          }}
          items={[
            { label: "Home", key: "home", icon: <HomeOutlined /> },
            {
              label: "Investigações",
              key: "investigations",
              icon: <UnorderedListOutlined />,
            },
            {
              label: "Adicionar dados",
              key: "investigations-add",
              icon: <FileAddOutlined />,
            },
            {
              label: "Notificações",
              key: "notifications",
              icon: <NotificationOutlined />,
            },
            {
              label: "Meu perfil",
              key: "profile",
              icon: <UserOutlined />,
              children: [
                { label: "Perfil", key: "profile", icon: <UserOutlined /> },
                {
                  label: "Minhas investigações",
                  key: "my-investigations",
                  icon: <ContainerOutlined />,
                },
                { label: "Sair", key: "logout", icon: <LogoutOutlined /> },
              ],
            },
          ]}
          style={{ backgroundColor: "#153D50", width: "100%" }}
          theme="dark"
        ></Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ overflow: "initial" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default App;
