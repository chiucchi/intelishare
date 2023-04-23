// create and configure axios to send requests to the api, one with authorization and another without
import axios from 'axios';
import Cookies from "js-cookie";

export const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const apiAuth = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
    },
});