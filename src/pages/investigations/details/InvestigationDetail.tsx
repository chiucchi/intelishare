import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  DatePickerProps,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import PageContainer from "../../../components/container/Container";
import { useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import type { SelectProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  RollbackOutlined,
  SendOutlined,
} from "@ant-design/icons";
import JSZip from "jszip";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { extractUser } from "../../../helpers/getUser";

interface DataType {
  key: string;
  file: string;
  extension: string;
  tags: string[];
}

const InvestigationDetail = () => {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [mainFile, setMainFile] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const userData = extractUser();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change:", e.target.value);
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleAddClick = () => {};

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setMainFile(file?.name);
    if (!file) {
      return;
    }
    const zip = new JSZip();
    const zipFile = await zip.loadAsync(file);
    const files = Object.keys(zipFile.files);
    setFilenames(files);
    /* setFiles(zipFile.files); */
    console.log(files);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const sights = {
    Beijing: ["Tiananmen", "Great Wall"],
    Shanghai: ["Oriental Pearl", "The Bund"],
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Arquivo",
      dataIndex: "file",
      key: "file",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Extensão",
      dataIndex: "extension",
      key: "extension",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="text" onClick={() => setIsModalOpen(true)} disabled>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Deletar o arquivo"
            description="Você tem certeza que quer remover o arquivo?"
            okText="Sim"
            cancelText="Não"
            disabled
            onConfirm={() => {
              console.log(record);
              // adicionar trigger da mensagem aqui
            }}
            onCancel={() => undefined}
          >
            <Button type="text" disabled>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      file: "Documento 1",
      extension: "pdf",
      tags: ["importante", "documento", "envolvido", "brasilia", "roubo"],
    },
  ];

  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

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
            <Form.Item
              label="Nome"
              name="name"
              rules={[
                { required: true, message: "Por favor adicione um nome" },
              ]}
            >
              <Input maxLength={40} onChange={() => undefined} disabled />
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
              label="Data"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Por favor adicione uma data próxima",
                },
              ]}
            >
              <DatePicker onChange={onChangeDate} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Checkbox checked={checked}>
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
                        <Col span={6} style={{ marginBottom: "24px" }}></Col>
                      </Row>
                    ))}
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      disabled
                      block
                      icon={<PlusOutlined />}
                    >
                      Adicionar envolvido
                    </Button>
                  </>
                );
              }}
            </Form.List>
          </>
        )}
        <Divider />
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          <Typography.Title level={4}>Inserir arquivos</Typography.Title>
          <input type="file" onChange={handleFileSelect} disabled />
          <Table dataSource={data} columns={columns} />
        </Space>
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "32px",
          }}
        >
          <Button type="primary" onClick={() => navigate("/investigations")}>
            <RollbackOutlined />
            Voltar
          </Button>
        </div>
      </Form>
    </PageContainer>
  );
};

export default InvestigationDetail;
