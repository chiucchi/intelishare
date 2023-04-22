import { Button, Form, Input, Space, Typography } from "antd";
import Image from "../../assets/vector.svg";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    navigate("/home");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "100vh",
          backgroundColor: "#153D50",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Image} alt="image" width="60%" height="60%" />
      </div>
      <div
        style={{
          width: "50%",
          height: "100vh",
          backgroundColor: "#f2f2f2",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography.Title>Login</Typography.Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Space direction="vertical">
              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  { required: true, message: "Por favor insira o seu email!" },
                ]}
              >
                <Input placeholder="user@mail.com" />
              </Form.Item>
              <Form.Item
                label="Senha"
                name="password"
                rules={[
                  { required: true, message: "Por favor insira a sua senha!" },
                ]}
              >
                <Input.Password placeholder="********" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Entrar
                </Button>
              </Form.Item>
            </Space>
          </Form>
          <Typography.Text>
            Não tem uma conta?{" "}
            <Typography.Link href="/sign">Registre-se</Typography.Link>
          </Typography.Text>
        </div>
      </div>
    </div>
  );
}

export default Login;