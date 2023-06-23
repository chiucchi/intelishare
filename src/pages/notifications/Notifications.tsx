import { Button, Empty, List, Space, Typography } from "antd";
import PageContainer from "../../components/container/Container";
import { NotificationOutlined } from "@ant-design/icons";
import { getUserNotifications } from "../../utils/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Notification {
  title: string;
  description: string;
  type: string;
  response?: boolean;
  askAccess?: boolean;
  relatedInvestigationId: string;
  relatedInvestigationAuthor: string;
}

const Notifications = () => {
  const [data, setData] = useState<Notification[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      const userNotifications = await getUserNotifications();
      const parsedNotifications = userNotifications.map(
        (notification: String) => JSON.parse(notification as string)
      );
      setData(parsedNotifications);
    };
    fetchNotifications();
  }, []);

  function visualizeInvestigation(item: any) {
    navigate(`/investigations/detail/${item.relatedInvestigationId}`);
  }

  const returnActions = (item: any) => {
    switch (item.type) {
      case "access-request":
        if (item.response === false) {
          return [
            <Button
              type="primary"
              onClick={() => {
                // send to backend the response
              }}
            >
              Aprovar
            </Button>,
            <Button
              type="dashed"
              onClick={() => {
                // send to backend the response
              }}
            >
              Reprovar
            </Button>,
          ];
        } else
          return [
            <Button type="dashed" disabled>
              Respondido
            </Button>,
          ];
      case "access-response":
        if (item.response === true)
          return [<Button type="primary">Visualizar</Button>];
        else return [];
      case "inform":
        return [
          <Button type="primary" onClick={() => visualizeInvestigation(item)}>
            Visualizar
          </Button>,
        ]; // checar se a investigação é privada ou publica, se publica mostrar o botão de visualizar, se não, mostrar o botão de solicitar acesso
      case "inform-ask-access":
        if (item.askAccess === false)
          return [<Button type="primary">Solicitar Acesso</Button>];
        else
          return [
            <Button type="dashed" disabled>
              Pedido enviado
            </Button>,
          ];
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
          renderItem={(item) => (
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
