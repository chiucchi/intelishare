import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  DatePickerProps,
  Divider,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import PageContainer from "../../../components/container/Container";
import { useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import JSZip from "jszip";

const InvestigationsAdd = () => {
  const [checked, setChecked] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [filenames, setFilenames] = useState<string[]>([]);

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
    setChecked(e.target.checked);
  };

  const handleAddClick = () => {};

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

  return (
    <PageContainer>
      <Typography.Title>Adicionar dados</Typography.Title>
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 24]} align="middle">
        <Col span={12}>
          <Input showCount maxLength={40} onChange={onChange} />
        </Col>
        <Col span={12}>
          <Input disabled value="John Doe" />
        </Col>
        <Col span={6}>
          <DatePicker onChange={onChangeDate} />
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
          <Row gutter={16}>
            <Col span={12}>
              <Input onChange={onChange} />
            </Col>
            <Space>
              <Button>
                <PlusOutlined />
              </Button>
              <Button>
                <DeleteOutlined />
              </Button>
            </Space>
          </Row>
        </>
      )}
      <Divider />
      <Typography.Title level={4}>Enviar arquivos</Typography.Title>
      <input type="file" onChange={handleFileSelect} />
      <ul>
        {filenames.map((filename) => (
          <li key={filename}>{filename}</li>
        ))}
      </ul>
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          right: "32px",
        }}
      >
        <Button type="primary">
          <PlusOutlined />
          Enviar dados
        </Button>
      </div>
    </PageContainer>
  );
};

export default InvestigationsAdd;
