import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Typography,
  Upload,
  message,
} from "antd";
import Image from "../../assets/vector.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function Sign() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(
    "https://xsgames.co/randomusers/avatar.php?g=pixel"
  );

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    navigate("/home");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{ width: "100%", borderRadius: "50%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
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
              <Form.Item label="Telefone" name="telephone">
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
                    onChange={handleChange}
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
                  Entrar
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
