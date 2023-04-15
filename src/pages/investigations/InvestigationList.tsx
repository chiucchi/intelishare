import { Table, Typography } from "antd";
import PageContainer from "../../components/container/Container";

const Investigationlist = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <PageContainer>
      <Typography.Title>Listagem de investigações</Typography.Title>
      <Table dataSource={dataSource} columns={columns} />
    </PageContainer>
  );
};

export default Investigationlist;
