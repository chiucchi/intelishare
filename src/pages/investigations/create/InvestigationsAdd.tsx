import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  DatePickerProps,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
  notification,
} from "antd";
import PageContainer from "../../../components/container/Container";
import { useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  MinusCircleOutlined,
  PlusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { extractUser } from "../../../helpers/getUser";
import { apiAuth } from "../../../helpers/api";
import { useNavigate } from "react-router-dom";

const InvestigationsAdd = () => {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState<File>();
  const userData = extractUser();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change:", e.target.value);
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onChangeCheck = (e: CheckboxChangeEvent) => {
    form.setFieldsValue({ involveds: "" });
    setChecked(e.target.checked);
  };

  const handleAddClick = () => {};

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    /* if (file.size > 1024) {
      notification.open({
        message: "O arquivo é muito grande",
        description: "O arquivo deve ter no máximo 1MB",
      });
    } */

    // check if file is a zip
    if (
      file.type !== "application/zip" &&
      file.type !== "application/x-zip-compressed"
    ) {
      notification.open({
        message: "O arquivo não é um zip",
        description:
          "O arquivo deve possuir uma das seguintes extensões: .zip .rar .7z .tar .gz .bz2",
      });
    } else {
      setFile(file);
    }
  };

  const onFinish = (values: any) => {
    if (!values.isPublic) {
      values.isPublic = true;
    }
    if (!values.involveds) {
      values.involveds = [];
    }
    if (!values.tags) {
      values.tags = selectedItems;
    }
    if (!values.author) {
      values.author = userData?.name;
    }
    values.permitedUsers = [userData?.id];
    apiAuth
      .post("/investigations", values)
      .then(() => {
        notification.open({
          type: "success",
          message: "A investigação foi criada com sucesso",
          description:
            "Agora a sua investigação está disponível e faz parte do nosso banco de dados",
        });
        navigate("/investigations");
      })
      .catch((err) => {
        notification.open({
          type: "error",
          message: "Ocorreu um erro ao criar a investigação",
          description: err.response.data.message,
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  return (
    <PageContainer style={{ height: "100%" }}>
      <Typography.Title>Adicionar dados</Typography.Title>
      <Form
        form={form}
        name="add-investigation"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]} align="top">
          <Col span={12}>
            <Form.Item
              label="Nome"
              name="name"
              rules={[
                { required: true, message: "Por favor adicione um nome" },
              ]}
            >
              <Input showCount maxLength={40} onChange={onChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Autor" name="author">
              <Input
                defaultValue={userData?.name}
                onChange={() => undefined}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Data de início"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Por favor adicione uma data próxima",
                },
              ]}
            >
              <DatePicker onChange={onChangeDate} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Privacidade" name="isPublic">
              <Switch
                defaultChecked
                checkedChildren="Pública"
                unCheckedChildren="Privada"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Checkbox checked={checked} onChange={onChangeCheck}>
              Adicionar envolvidos conhecidos na investigação
            </Checkbox>
          </Col>
        </Row>
        {checked && (
          <>
            <Divider />
            <Typography.Title level={4}>Envolvidos</Typography.Title>
            <Form.List name="involveds">
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map((field) => (
                      <Row gutter={16} key={field.key} align="middle">
                        <Col span={12}>
                          <Form.Item
                            {...field}
                            name={[field.name, "involved"]}
                            rules={[
                              {
                                required: true,
                                message:
                                  "Favor adicionar um nome, ou remover o envolvido",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={6} style={{ marginBottom: "24px" }}>
                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Row>
                      <Col span={12}>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Adicionar envolvido
                        </Button>
                      </Col>
                    </Row>
                  </>
                );
              }}
            </Form.List>
          </>
        )}
        <Divider />
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          <Typography.Title level={4}>Inserir arquivos</Typography.Title>
          <Form.Item name="file">
            <Input
              type="file"
              onChange={handleFileSelect}
              bordered={false}
              accept=".zip,application/zip,.rar,.7zip,.tar,.gz"
            />
          </Form.Item>
        </Space>
        <Divider />
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          <Typography.Title level={4}>Tags relevantes</Typography.Title>
          <Row>
            <Col span={12}>
              <Form.Item name="tags">
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  value={selectedItems}
                  onChange={setSelectedItems}
                  tokenSeparators={[","]}
                  options={[]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Space>
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "32px",
          }}
        >
          <Button type="primary" htmlType="submit">
            <SendOutlined />
            Enviar dados
          </Button>
        </div>
      </Form>
    </PageContainer>
  );
};

export default InvestigationsAdd;
