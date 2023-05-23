import {
  Avatar,
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Descriptions,
  Divider,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import PageContainer from "../../components/container/Container";
import { QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
import { ufData } from "../../mocks/uf-mock";
import { extractUser } from "../../helpers/getUser";
import { useState } from "react";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const user = extractUser();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {};

  const handleChange = (value: string) => {};

  return (
    <PageContainer>
      <Typography.Title>Meu perfil</Typography.Title>
      <Form name="basic" initialValues={{ remember: true }} autoComplete="off">
        <Row align="middle" style={{ margin: "48px 0 48px" }}>
          <Col span={4}>
            <Space
              direction="vertical"
              size="middle"
              style={{ cursor: "pointer" }}
              onClick={() => {
                // change profile pic
              }}
            >
              <Avatar
                size={128}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#D9D9D9" }}
              />
            </Space>
          </Col>
          <Col span={18}>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 24]}>
              <Col span={12}>
                <Form.Item label="Nome" name="name">
                  {!edit ? (
                    <>{user.name}</>
                  ) : (
                    <Input defaultValue={user.name} onChange={onChange} />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email">
                  {!edit ? (
                    <Descriptions.Item label="Email">
                      {user.email}
                    </Descriptions.Item>
                  ) : (
                    <Input defaultValue={user.email} onChange={onChange} />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Senha" name="password">
                  {!edit ? (
                    <Descriptions.Item label="Senha">
                      ************
                    </Descriptions.Item>
                  ) : (
                    <Input
                      type="password"
                      defaultValue="************"
                      onChange={onChange}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Data de Nascimento" name="birthDate">
                  <DatePicker
                    onChange={onChangeDate}
                    format="DD/MM/YYYY"
                    disabled={!edit}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="UF" name="uf">
                  <Select
                    defaultValue="MG"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={ufData}
                    disabled={!edit}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Space
          style={{
            position: "absolute",
            bottom: "32px",
            right: "32px",
          }}
          size="large"
        >
          {!edit ? (
            <Popconfirm
              title="Deletar conta"
              description="Você tem certeza que deseja excluir a sua conta e todas as suas investigações?"
              okText="Sim"
              cancelText="Não"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => {
                // delete account
              }}
            >
              <Button>Deletar conta</Button>
            </Popconfirm>
          ) : (
            <Button type="dashed" onClick={() => setEdit(false)}>
              Cancelar
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => {
              if (edit) {
                // save changes
              } else {
                setEdit(true);
              }
            }}
          >
            {edit ? "Salvar" : "Editar"}
          </Button>
        </Space>
      </Form>
    </PageContainer>
  );
};

export default Profile;
