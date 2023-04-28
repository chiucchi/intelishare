import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Typography,
  notification,
} from "antd";
import Image from "../../assets/vector.svg";
import { useNavigate } from "react-router-dom";
import { api } from "../../helpers/api";

function Sign() {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    await api
      .post("/user", values)
      .then((res) => {
        notification.open({
          type: "success",
          message: "Usuário criado com sucesso",
          description: "Faça login para continuar",
        });
        navigate("/login");
      })
      .catch((err) => {
        notification.open({
          type: "error",
          message: "Ocorreu um erro ao criar o usuário",
          description: err.response.data.message,
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    notification.open({
      type: "error",
      message: "Ocorreu um erro ao criar o usuário",
      description: errorInfo,
    });
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
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography.Title>Cadastro</Typography.Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Space direction="vertical">
              <div style={{ display: "flex", justifyContent: "center" }}></div>
              <Form.Item
                label="Nome completo"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o seu nome completo!",
                  },
                ]}
              >
                <Input placeholder="Fulano da Silva" />
              </Form.Item>
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
                label="Telefone"
                name="telephone"
                rules={[
                  {
                    required: true,
                    message: "Por favor insira o seu número!",
                  },
                ]}
              >
                <Input placeholder="(99) 9999-9999" />
              </Form.Item>
              <Space>
                <Form.Item
                  label="Data de nascimento"
                  name="date"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  label="UF"
                  name="uf"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    style={{ width: 120 }}
                    onChange={() => {
                      console.log("mudou");
                    }}
                    options={[
                      { value: "rj", label: "Rj" },
                      { value: "sp", label: "Sp" },
                      { value: "mg", label: "Mg" },
                    ]}
                  />
                </Form.Item>
              </Space>
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
                  Criar
                </Button>
              </Form.Item>
            </Space>
          </Form>
          <Typography.Text>
            Possui uma conta?{" "}
            <Typography.Link href="/login">Logue já</Typography.Link>
          </Typography.Text>
        </div>
      </div>
    </div>
  );
}

export default Sign;
