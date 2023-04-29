// create and configure axios to send requests to the api, one with authorization and another without
import axios from "axios";
import Cookies from "js-cookie";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://intelishare-api-prod.up.railway.app/";

export const api = axios.create({
  baseURL: url,
});

export const apiAuth = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});
