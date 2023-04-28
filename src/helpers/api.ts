// create and configure axios to send requests to the api, one with authorization and another without
import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "https://intelishare-api-prod.up.railway.app/",
});

export const apiAuth = axios.create({
  baseURL: "https://intelishare-api-prod.up.railway.app/",
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});
