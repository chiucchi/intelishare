import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Descriptions,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Tag,
  Typography,
} from "antd";
import PageContainer from "../../../components/container/Container";
import { useContext, useEffect, useState } from "react";
import type { SelectProps } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { extractUser } from "../../../helpers/getUser";
import { apiAuth } from "../../../helpers/api";
import * as dayjs from "dayjs";
import UserContext from "../../../context/user";

interface DataType {
  id: number;
  name: string;
  author: string;
  date: Date;
  uf: string;
  isPublic: boolean;
  involveds: string[];
  files: string; // pensar nisso
  tags: string[];
}

const InvestigationDetail = () => {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const userData = extractUser();
  const { state } = useContext(UserContext);

  const [switchState, setSwitchState] = useState(false);

  const [data, setData] = useState<DataType>();

  const navigate = useNavigate();
  const { id } = useParams();

  const onFinish = (values: any) => {};

  const onFinishFailed = (errorInfo: any) => {};

  useEffect(() => {
    async function fetchData() {
      apiAuth.get(`/investigations/${id}`).then((res) => {
        setData(res.data);
      });
    }

    fetchData();
    if (data?.involveds ? data.involveds.length > 0 : false) {
      setChecked(true);
    }
  }, []);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        author: data.author,
        date: dayjs(data.date),
        involveds: data.involveds,
        tags: data.tags,
        isPublic: data.isPublic,
      });
      setSwitchState(data.isPublic);
    }
    if (data?.involveds ? data.involveds.length > 0 : false) {
      setChecked(true);
    }
  }, [data]);

  return (
    <PageContainer style={{ height: "100%" }}>
      <Typography.Title>Visualizar dados</Typography.Title>
      <Form
        form={form}
        name="add-investigation"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 24]} align="top">
          <Col span={12}>
            <Form.Item label="Nome" name="name">
              <Input
                maxLength={40}
                defaultValue="Investigação 1"
                /* pegar do nome do usuário autor da investigação */
                onChange={() => undefined}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Autor" name="author">
              <Input
                defaultValue={state.name} // pegar do nome do usuário autor da investigação
                onChange={() => undefined}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Data" name="date">
              <DatePicker disabled format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Privacidade" name="isPublic">
              <Switch
                checked={switchState}
                checkedChildren="Pública"
                unCheckedChildren="Privada"
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        {checked && (
          <>
            <Divider />
            <Typography.Title level={4}>Envolvidos</Typography.Title>
            {data?.involveds.map((involved) => (
              <Descriptions.Item>
                {involved} <br />
              </Descriptions.Item>
            ))}
          </>
        )}
        <Divider />
        <Space direction="vertical" style={{ display: "flex" }}>
          <Typography.Title level={4}>Arquivos</Typography.Title>
          return where the file is stored
        </Space>
        <Divider />
        <Space direction="vertical" style={{ display: "flex" }}>
          <Typography.Title level={4}>Tags relevantes</Typography.Title>
          <Form.Item name="tags">
            {data?.tags.map((item) => (
              <Tag color="blue" key={item}>
                {item}
              </Tag>
            ))}
          </Form.Item>
        </Space>
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "32px",
          }}
        >
          <Button type="primary" onClick={() => navigate(-1)}>
            <RollbackOutlined />
            Voltar
          </Button>
        </div>
      </Form>
    </PageContainer>
  );
};

export default InvestigationDetail;
