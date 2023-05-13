import { Button, Empty, List, Space, Typography } from "antd";
import PageContainer from "../../components/container/Container";
import { NotificationOutlined } from "@ant-design/icons";
import { extractUser, getUser } from "../../helpers/getUser";
import { dados } from "./notifications-mock";

const Notifications = () => {
  const userData = extractUser();

  // get notifications from userdata
  const data = userData.notifications;

  function visualizeInvestigation() {}

  const returnActions = (type: any) => {
    switch (type.type) {
      case "request-access":
        if (type.response === false) {
          return [
            <Button type="primary">Aprovar</Button>,
            <Button type="dashed">Reprovar</Button>,
          ];
        } else
          return [
            <Button type="dashed" disabled>
              Respondido
            </Button>,
          ];
      case "access-response":
        if (type.response === true)
          return [<Button type="primary">Visualizar</Button>];
        else return [];
      case "inform":
        return [<Button type="primary">Visualizar</Button>]; // checar se a investigação é privada ou publica, se publica mostrar o botão de visualizar, se não, mostrar o botão de solicitar acesso
      default:
        return [];
    }
  };

  return (
    <PageContainer>
      <Typography.Title>Notificações</Typography.Title>
      {dados.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={dados}
          renderItem={(item, index) => (
            <List.Item actions={returnActions(item)}>
              <List.Item.Meta
                avatar={<NotificationOutlined />}
                title={item.title}
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
