import axios from "axios";
import { stringify } from "qs";

const request = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000 * 10,
  //携带cookie
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
  //   qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' })
  // // 'a[0]=b&a[1]=c'
  // qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' })
  // // 'a[]=b&a[]=c'
  // qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' })
  // // 'a=b&a=c'
  // qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'comma' })
  // // 'a=b,c'
  paramsSerializer: (params) => {
    return stringify(params, { arrayFormat: "brackets" });
  },
});

request.interceptors.request.use((req) => {
  req.withCredentials = true;
  return req;
});

request.interceptors.response.use((response) => {
  if (!response.data.success) {
    return Promise.reject(response);
  }
  return { ...response, data: response.data.data };
});

export default request;
