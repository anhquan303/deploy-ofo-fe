import axios from "axios";
const baseApiUrl = 'https://reqres.in/';

const baseInstance = axios.create({
  baseURL: baseApiUrl,
});

baseInstance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("authtoken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseInstance.interceptors.response.use(
  (response) => {
    if (response.headers.authorization) {
      localStorage.setItem("authtoken", response.headers.authorization);
    }
    return response;
  },
  (error) => {
    //  message = error.message;
    // if (error.response.data && error.response.data.errors) {
    //   message = error.response.data.errors;
    // } else if (error.response.data && error.response.data.error) {
    //   message = error.response.data.error;
    // }
    return Promise.reject(error);
  }
);

export default baseInstance;