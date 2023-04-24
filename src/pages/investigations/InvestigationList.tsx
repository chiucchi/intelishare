import { Space, Table, Typography, Tag, Select, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

import PageContainer from "../../components/container/Container";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { apiAuth } from "../../helpers/api";
import { useEffect, useMemo, useState } from "react";

interface DataType {
  key: string;
  name: string;
  author: string;
  uf: string;
  tags: string[];
}

const Investigationlist = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      apiAuth.get("/investigations").then((res) => {
        setData(res.data);
      });
    }

    fetchData();
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
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
            return (
              <Tag color="geekblue" key={tag}>
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

  return (
    <PageContainer>
      <Typography.Title>Listagem de investigações</Typography.Title>
      <Table dataSource={memoizedData} columns={columns} />
    </PageContainer>
  );
};

export default Investigationlist;
