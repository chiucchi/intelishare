import { Button, List, Typography } from "antd";
import PageContainer from "../../components/container/Container";
import { NotificationOutlined } from "@ant-design/icons";

const Notifications = () => {
  const data = [
    {
      title: "Fulano pediu acesso à sua investigação",
      type: "request-access",
      userId: "123456789",
      investigationId: "123456789",
      description: "",
    },
    {
      title: "O seu acesso à investigação X foi aprovado",
      type: "access-response",
      userId: "123456789",
      investigationId: "123456789",
      description: "",
    },
    {
      title:
        "A investigação x pode conter informações relevantes à sua investigação y",
      type: "inform",
      description: "",
    },
  ];

  const returnActions = (type: string) => {
    switch (type) {
      case "request-access":
        return [
          <Button type="primary">Aprovar</Button>,
          <Button type="dashed">Reprovar</Button>,
        ];
      case "access-response":
        return [<Button type="primary">Visualizar</Button>]; // checar se foi aprovado ou reprovado, se reprovado, não mostrar o botão
      case "inform":
        return [<Button type="primary">Visualizar</Button>]; // checar se a investigação é privada ou publica, se publica mostrar o botão de visualizar, se não, mostrar o botão de solicitar acesso
      default:
        return [];
    }
  };

  return (
    <PageContainer>
      <Typography.Title>Notificações</Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item actions={returnActions(item.type)}>
            <List.Item.Meta
              avatar={<NotificationOutlined />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </PageContainer>
  );
};

export default Notifications;
