import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import { apiAuth } from "./api";

export const getUser = async () => {
  const { data } = await apiAuth.get("/profile");
  return data;
};

export const extractUser = () => {
  const token = Cookies.get("token");
  var decoded = {
    id: 0,
    name: "",
    email: "",
    notifications: [
      {
        title: "",
        type: "",
        userId: "",
        investigationId: "",
        description: "",
      },
    ],
  };

  if (token) {
    decoded = jwt_decode(token);
  }

  console.log("decoded: ", decoded);
  return decoded;
};
