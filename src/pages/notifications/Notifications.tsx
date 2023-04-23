import { Button, Empty, List, Space, Typography } from "antd";
import PageContainer from "../../components/container/Container";
import { NotificationOutlined } from "@ant-design/icons";
import { extractUser, getUser } from "../../helpers/getUser";
import { dados } from "./notifications-mock";

const Notifications = () => {
  const userData = extractUser();

  // get notifications from userdata
  const data = userData.notifications;

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
      {data.length > 0 ? (
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
      ) : (
        <div style={{ position: "relative", top: "30%" }}>
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            description="Não há notificações para serem exibidas."
          />
        </div>
      )}
    </PageContainer>
  );
};

export default Notifications;
