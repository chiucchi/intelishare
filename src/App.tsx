import "antd/dist/reset.css";

import "./App.css";
import { Avatar, Divider, Empty, Layout, Menu, Space, Typography } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  FileAddOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Route, Routes, useNavigate } from "react-router-dom";
import Investigationlist from "./pages/investigations/InvestigationList";
import PageHome from "./pages/home/PageHome";

function App() {
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
          style={{ marginLeft: "16px" }}
        >
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#D9D9D9" }}
            onClick={() => {
              navigate("profile");
            }}
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
            navigate(key);
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
          ]}
          style={{ backgroundColor: "#153D50", width: "100%" }}
          theme="dark"
        ></Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ overflow: "initial" }}>
          <Contenta></Contenta>
        </Content>
      </Layout>
    </Layout>
  );
}

function Contenta() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<PageHome />}></Route>
        <Route path="/" element={<PageHome />}></Route>
        <Route
          path="/investigations"
          element={<Investigationlist/>}
        ></Route>
        <Route
          path="/investigations-add"
          element={<div>Adicionar investigações</div>}
        ></Route>
        <Route
          path="/investigations/:id"
          element={<div>Investigação</div>}
        ></Route>
        {/* <Route path="*" element={<Empty />}></Route> */}
        <Route path="/notifications" element={<div>Notificações</div>}></Route>
        <Route path="/profile" element={<div>Perfil</div>}></Route>
      </Routes>
    </div>
  );
}

export default App;
