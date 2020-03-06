import { toast } from "react-toastify";
import queryString from "query-string";
import * as jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndPointLogin = `/auth/`;
const apiEndPointValidate = `/auth/refresh/`;

const refreshTokenTime = 300000;
const tokenKey = "camp_user_token";
const userKey = "camp_user_information";

export async function login(user) {
  const info = {
    email: user.email,
    password: user.password
  };
  const { data } = await http.post(apiEndPointLogin, info);
  const decode = jwtDecode(data.access);
  setToken(data, decode);
  // setUserInfo(data.user);
  return data.user;
}

async function setUserInfo({
  id,
  email,
  first_name,
  last_name,
  created_at,
  updated_at
}) {
  const info = {
    [id]: {
      email,
      first_name,
      last_name,
      created_at,
      updated_at
    }
  };

  localStorage.setItem(userKey, JSON.stringify(info));
}

async function setToken(data, { uid }) {
  const token = {
    [uid]: {
      authorization: data["access"]
    }
  };
  localStorage.setItem(tokenKey, JSON.stringify(token));
}

export async function getCurrentUser() {
  try {
    const info = localStorage.getItem(userKey);
    const obj = JSON.parse(info);
    const uid = Object.keys(obj)[0];
    return obj[uid];
  } catch (err) {
    return null;
  }
}

export async function getToken() {
  try {
    const token = await localStorage.getItem(tokenKey);
    const obj = JSON.parse(token);
    const uid = Object.keys(obj)[0];
    const result = obj[uid];
    return result;
  } catch (error) {
    return null;
  }
}

export async function logout() {
  // const { status } = await http.delete(apiEndPointLogout);
  // if (status !== 200) {
  //   return false;
  // }
  // return true;
  removeLocalStorage();
}

export async function removeLocalStorage() {
  const token = await JSON.parse(localStorage.getItem(tokenKey));
  const info = await JSON.parse(localStorage.getItem(userKey));
  const id = Object.keys(info)[0];

  await delete token[id];
  await delete info[id];

  localStorage.setItem(tokenKey, JSON.stringify(token));
  localStorage.setItem(userKey, JSON.stringify(info));
}

export async function getUserId() {
  const info = localStorage.getItem(userKey);
  const obj = JSON.parse(info);
  const id = Object.keys(obj)[0];
  return id;
}

export async function validateToken() {
  try {
    const token = await getToken();
    if (!token) return;

    const { data } = await http.get(apiEndPointValidate);
    const decode = jwtDecode(data.access);

    const items = data;
    setToken(data, decode);
    // setUserInfo(data);

    const newToken = await getToken();
    http.setRequestHeader(newToken);
  } catch (error) {
    return {};
  }
}

export async function handleExpiredToken() {
  const { msg } = queryString.parse(window.location.search);
  if (msg && msg === "Login required") {
    // await logout();
    await removeLocalStorage();
    toast.error(msg);
  }
}

async function init() {
  const token = await getToken();
  http.setRequestHeader(token);
}

// origin.length > 4 doesnt execute in landing page
setInterval(function() {
  validateToken();
}, refreshTokenTime);
init();

export default {
  login,
  setToken,
  logout,
  getCurrentUser,
  getUserId,
  getToken,
  removeLocalStorage,
  validateToken,
  handleExpiredToken
};
