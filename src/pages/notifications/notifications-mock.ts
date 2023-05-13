export const dados = [
  {
    title: "Fulano pediu acesso à sua investigação",
    type: "request-access",
    userId: "123456789",
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
  },
];
