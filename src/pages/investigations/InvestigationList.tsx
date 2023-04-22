import { Space, Table, Typography, Tag, Select, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

import PageContainer from "../../components/container/Container";
import { EyeOutlined } from "@ant-design/icons";

const Investigationlist = () => {
  interface DataType {
    key: string;
    name: string;
    author: string;
    uf: string;
    tags: string[];
  }

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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" onClick={() => undefined}>
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
