import axios from "axios";
import { getStorage, removeStorage } from "./local-storage";

const APP_API_URL = import.meta.env.VITE_API_URL;
const axiosClient = axios.create({
  baseURL: APP_API_URL,
  headers: {
    Accept: "application/json",
    withCredentials: true,
    "Access-Control-Allow-Origin": "*",
    // Rest api default setting sf ro api request
    // "Content-Type": "multipart/form-data",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((req) => {
  const token = getStorage("ACCESS_TOKEN"); // get token
  if (token) req.headers["Authorization"] = `Bearer ${token}`;
  return req;
});

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    // try {

    if (err?.code == "ERR_NETWORK") {
      // console.error(err?.message);
      // console.log("Network Error! Try again.");
    } else if (err?.response && err.response.status == 401) {
      // console.log("Removing user**");
      removeStorage("ACCESS_TOKEN");
      // TODO:
      // window.location.href = "/login?ref=aus";
      // window.location.href = "/?ref=aus";
    } else {
      console.error(err?.message);
    }

    throw err;
  }
);

export default axiosClient;
