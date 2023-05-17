import {
  Avatar,
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Divider,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import PageContainer from "../../components/container/Container";
import { UserOutlined } from "@ant-design/icons";
import { ufData } from "../../mocks/uf-mock";

const Profile = () => {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {};

  const handleChange = (value: string) => {};

  return (
    <PageContainer>
      <Typography.Title>Meu perfil</Typography.Title>
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
              <Input value="John Doe" />
            </Col>
            <Col span={12}>
              <Input value="John@Doe.com" />
            </Col>
            <Col span={12}>
              <Input.Password value="38291732189" onChange={onChange} />
            </Col>
            <Col span={6}>
              <DatePicker onChange={onChangeDate} format="DD/MM/YYYY" />
            </Col>
            <Col span={6}>
              <Select
                defaultValue="MG"
                style={{ width: 120 }}
                onChange={handleChange}
                options={ufData}
              />
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
        <Button>Deletar conta</Button>
        <Button
          type="primary"
          onClick={() => {
            console.log("edit account button clicked");
            // activate inputs, or transform description to inputs
          }}
        >
          Editar
        </Button>
      </Space>
    </PageContainer>
  );
};

export default Profile;
