import {
  Space,
  Table,
  Typography,
  Tag,
  Select,
  Button,
  Popconfirm,
  notification,
  Empty,
} from "antd";
import type { ColumnsType } from "antd/es/table";

import PageContainer from "../../components/container/Container";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { apiAuth } from "../../helpers/api";
import { useEffect, useMemo, useState } from "react";

interface DataType {
  id: string;
  key: string;
  name: string;
  author: string;
  uf: string;
  tags: string[];
}

const Investigationlist = (props: { userInvestigations: boolean }) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  async function fetchData() {
    if (!props.userInvestigations) {
      apiAuth.get("/investigations").then((res) => {
        setData(res.data);
      });
    } else {
      apiAuth.get("/profile/investigations").then((res) => {
        setData(res.data);
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [props.userInvestigations]);

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
              navigate(`detail/${record.id}`);
            }}
            size="small"
          >
            <EyeOutlined />
          </Button>
          {props.userInvestigations && (
            <>
              <Button
                type="text"
                size="small"
                onClick={() => {
                  navigate(`edit/${record.id}`);
                }}
              >
                <EditOutlined />
              </Button>
              <Popconfirm
                title="Você tem certeza?"
                description="Essa ação não pode ser desfeita e apagará todos os dados da investigação."
                okText="Excluir"
                cancelText="Cancelar"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => {
                  apiAuth
                    .delete(`/investigations/${record.id}`)
                    .then(() => {
                      notification.open({
                        type: "success",
                        message: "A investigação foi removida com sucesso",
                        description:
                          "A sua investigação foi removida com sucesso do nosso banco de dados",
                      });
                      window.location.reload();
                    })
                    .catch((err) => {
                      notification.open({
                        type: "error",
                        message: "Ocorreu um erro ao remover a investigação",
                        description: err.response.data.message,
                      });
                    });
                }}
              >
                <Button type="text" size="small">
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <Typography.Title>
        {props.userInvestigations
          ? `Minhas investigações`
          : `Listagem de investigações`}
      </Typography.Title>
      <Table
        dataSource={memoizedData}
        columns={columns}
        locale={{
          emptyText: (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              description="Não há investigações para serem exibidas."
            />
          ),
        }}
      />
      {/* pensando em botar as q eu tenho acesso aqui dps de um divider, ou botar uma outra listagem no menu*/}
    </PageContainer>
  );
};

export default Investigationlist;
