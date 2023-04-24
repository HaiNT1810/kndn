import axios from 'axios';
import {BASE_URL} from '../../data';

export function Login(username, password) {
  return axios.post(`${BASE_URL}/app/login`, {
    username,
    password,
  });
}

export function GetUserInfo(token) {
  return axios.post(`${BASE_URL}/GetUserInfo`, {
    token,
  });
}
export function GetMenu(token) {
  return axios.post(`${BASE_URL}/GetMenu`, {
    token,
  });
}

