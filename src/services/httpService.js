import axios from "axios";
import { toast } from "react-toastify";

import { clientLog } from "./loggerService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
  debugger;
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    clientLog(error);
    toast.error("An expected error accurred");
  }

  const isLogin = window.location.pathname.indexOf("/login") !== -1;
  const origin = window.location.pathname.split("/");

  if (!error.response) {
    return (window.location = "/maintenance");
  }

  if (error.response.status === 401 && !isLogin) {
    if (origin[1] === "dashboard")
      return (window.location = "/dashboard/login?msg=Login required");
    else if (origin[2] === "dashboard")
      return (window.location = `/${origin[1]}/dashboard/login?msg=Login required`);
    else
      return (window.location = `/${origin[1]}/app/login?msg=Login required`);
  }

  return Promise.reject(error);
});

export function setRequestHeader(token) {
  if (token) {
    axios.defaults.headers.common["authorization"] = token["access"];
  }
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setRequestHeader
};
