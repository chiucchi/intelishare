import { extractUser } from "../../helpers/getUser";
import { Container, WelcomeText } from "./PageHome.styles";

const PageHome = () => {
  const userData = extractUser();

  return (
    <Container>
      <WelcomeText>Bem vindo(a) {userData?.name}</WelcomeText>
    </Container>
  );
};
export default PageHome;
