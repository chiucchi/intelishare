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
  SendOutlined,
} from "@ant-design/icons";
import JSZip from "jszip";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  file: string;
  extension: string;
  tags: string[];
}

const InvestigationEdit = () => {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [filenames, setFilenames] = useState<string[]>([]);
  const [mainFile, setMainFile] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const onChangeCheck = (e: CheckboxChangeEvent) => {
    console.log("checked = ", e.target.checked);
    form.setFieldsValue({ involveds: "" });
    setChecked(e.target.checked);
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
          <Button type="text" onClick={() => setIsModalOpen(true)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Deletar o arquivo"
            description="Você tem certeza que quer remover o arquivo?"
            okText="Sim"
            cancelText="Não"
            onConfirm={() => {
              console.log(record);
              // adicionar trigger da mensagem aqui
            }}
            onCancel={() => undefined}
          >
            <Button type="text">
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
      <Typography.Title>Editar dados</Typography.Title>
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
              <Input showCount maxLength={40} onChange={onChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Autor" name="author">
              <Input
                defaultValue="John Doe"
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
              <DatePicker onChange={onChangeDate} />
            </Form.Item>
          </Col>
          <Col span={12}>
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
                    <Button
                      type="dashed"
                      onClick={() => add()}
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
          <input type="file" onChange={handleFileSelect} />
          <Table dataSource={data} columns={columns} />
        </Space>
        <Modal
          title="Editar tags"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Select
              mode="tags"
              style={{ width: "100%" }}
              onChange={handleChange}
              tokenSeparators={[","]}
              options={options}
            />
          </Space>
        </Modal>
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

export default InvestigationEdit;
