import { useContext } from "react";
import { Container, WelcomeText } from "./PageHome.styles";
import UserContext from "../../context/user";

const PageHome = () => {
  const { state } = useContext(UserContext);

  return (
    <Container>
      <WelcomeText>Bem vindo(a) {state.name}</WelcomeText>
    </Container>
  );
};
export default PageHome;
