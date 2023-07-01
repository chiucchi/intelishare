// create and configure axios to send requests to the api, one with authorization and another without
import axios from "axios";
import Cookies from "universal-cookie";

const url = "https://intelishare-api-prod.up.railway.app";

const cookies = new Cookies();

export const api = axios.create({
  baseURL: url,
});

export const apiAuth = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${cookies.get("token")}`,
  },
});
