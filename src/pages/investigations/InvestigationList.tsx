import { Space, Table, Typography, Tag, Select, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

import PageContainer from "../../components/container/Container";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  author: string;
  uf: string;
  tags: string[];
}

const Investigationlist = () => {
  const navigate = useNavigate();

  const columns: ColumnsType<DataType> = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      /* render: (text) => <a>{text}</a>, */
    },
    {
      title: "Autor",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "UF",
      dataIndex: "uf",
      key: "uf",
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
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            onClick={() => {
              // fazer a request pra pegar os dados baseado no id aqui, e ai sim passar pra proxima pagina
              // ou fazer a request na pagina de detalhes também caso a pessoa de refresh na pagina
              navigate("detail");
            }}
          >
            <EyeOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "Investigação 1",
      author: "John Brown",
      tags: ["joão pereira", "furto"],
      uf: "SP",
    },
    {
      key: "2",
      name: "Investigação 2",
      author: "Jim Green",
      tags: ["estelionato", "pedro rocha"],
      uf: "DF",
    },
    {
      key: "3",
      name: "Investigação 3",
      author: "Joe Black",
      tags: ["john", "importante", "procurado"],
      uf: "MG",
    },
  ];

  return (
    <PageContainer>
      <Typography.Title>Listagem de investigações</Typography.Title>
      <Table dataSource={data} columns={columns} />
    </PageContainer>
  );
};

export default Investigationlist;
