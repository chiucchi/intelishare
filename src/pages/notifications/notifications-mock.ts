export const dados = [
  {
    title: "Fulano pediu acesso à sua investigação",
    type: "access-request",
    userId: "1",
    investigationId: "123456789",
    description: "",
    response: true, // ainda nao tem resposta ou ja tem dependendo do valor
  },
  {
    title: "O seu acesso à investigação X foi aprovado",
    type: "access-response",
    userId: "123456789",
    investigationId: "123456789",
    description: "",
    response: true,
  },
  {
    title: "O seu acesso à investigação X foi reprovado",
    type: "access-response",
    userId: "123456789",
    investigationId: "123456789",
    description: "",
    response: false,
  },
  {
    title:
      "A investigação x pode conter informações relevantes à sua investigação y",
    type: "inform",
    description: "",
    investigationId: "123456789",
  },
  {
    title:
      "A investigação x pode conter informações relevantes à sua investigação y",
    type: "inform-ask-access",
    description:
      "A investigação X é privada e para visualizar é necessário acesso",
    investigationId: "123456789",
    askAccess: true,
  },
  {
    title:
      "A investigação x pode conter informações relevantes à sua investigação y",
    type: "inform-ask-access",
    description:
      "A investigação X é privada e para visualizar é necessário acesso",
    investigationId: "123456789",
    askAccess: false,
  },
];
