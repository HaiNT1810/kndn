import axios from 'axios';
import {BASE_URL} from '../../data';

export function Login(user, pass) {
  return axios.post(`${BASE_URL}/login`, {
    Account: user,
    Password: pass,
  });
}

export function GetUserInfo(token) {
  return axios.post(`${BASE_URL}/GetUserInfo`, {
    token: token,
  });
}
export function GetMenu(token) {
  return axios.post(`${BASE_URL}/GetMenu`, {
    token: token,
  });
}
