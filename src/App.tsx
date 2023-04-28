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

import { useNavigate } from "react-router-dom";
import { extractUser } from "./helpers/getUser";
import Cookies from "js-cookie";

function App({ children }: { children: React.ReactNode }) {
  const { Content, Sider } = Layout;
  const navigate = useNavigate();
  const userData = extractUser();
  console.log("userData", userData);

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
            navigate("/profile");
          }}
        >
          <Avatar
            size={64}
            src={
              <img src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            }
            style={{ backgroundColor: "#D9D9D9" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography.Title level={5} style={{ color: "#f0f0f0" }}>
              {userData?.name || "Usuário"}
            </Typography.Title>
            <Typography.Text type="secondary" style={{ color: "#f0f0f0" }}>
              {userData?.email || ""}
            </Typography.Text>
          </div>
        </Space>
        <Divider />
        <Menu
          onClick={({ key }) => {
            if (key !== "logout") {
              navigate("/" + key);
            } else {
              Cookies.remove("token");
              navigate("/login");
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
              key: "investigations/add",
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
                  key: "profile/investigations",
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
