import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  DatePickerProps,
  Divider,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Typography,
  notification,
} from "antd";
import PageContainer from "../../../components/container/Container";
import { useEffect, useState } from "react";
import * as dayjs from "dayjs";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import type { SelectProps } from "antd";
import {
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { apiAuth } from "../../../helpers/api";

interface DataType {
  id: number;
  name: string;
  author: string;
  date: Date; // talvez nao
  uf: string;
  isPublic: boolean;
  involveds: string[];
  files: string; // pensar nisso
  tags: string[];
}

const InvestigationEdit = () => {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState<File>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [data, setData] = useState<DataType>();

  const navigate = useNavigate();
  const { id } = useParams();

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
    console.log(file.type);
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
    console.log(values);
    if (!values.isPublic) {
      values.isPublic = true;
    }
    if (!values.involveds) {
      values.involveds = [];
    }
    if (!values.tags) {
      values.tags = selectedItems;
    }
    apiAuth
      .patch(`/investigations/${id}`, values)
      .then(() => {
        notification.open({
          type: "success",
          message: "A investigação foi editada com sucesso",
          description: "Agora a sua investigação está atualizada",
        });
        navigate(-1);
      })
      .catch((err) => {
        notification.open({
          type: "error",
          message: "Ocorreu um erro ao editar a investigação",
          description: err.response.data.message,
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const onChangeSwitch = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

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
      });
    }
    if (data?.involveds ? data.involveds.length > 0 : false) {
      setChecked(true);
    }
  }, [data]);

  return (
    <PageContainer style={{ height: "100%" }}>
      <Typography.Title>Editar dados</Typography.Title>
      <Form
        form={form}
        name="edit-investigation"
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
              <Input onChange={() => undefined} disabled />
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
                defaultChecked={data?.isPublic}
                onChange={onChangeSwitch}
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
          {/* MOSTRAR AQUI O LINK DO ARQUIVO QUE JÁ TEM NA INVESTIGAÇÃO */}
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
          <Space>
            <Popconfirm
              title="Cancelar edição"
              description="Tem certeza que deseja dispensar as alterações?"
              okText="Sim"
              cancelText="Não"
              onConfirm={() => navigate(-1)}
            >
              <Button type="dashed" htmlType="button">
                <CloseOutlined />
                Cancelar
              </Button>
            </Popconfirm>
            <Button type="primary" htmlType="submit">
              <SendOutlined />
              Enviar dados
            </Button>
          </Space>
        </div>
      </Form>
    </PageContainer>
  );
};

export default InvestigationEdit;
