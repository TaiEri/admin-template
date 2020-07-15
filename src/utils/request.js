

import axios from 'axios'
import store from '../store'
import { getToken } from './auth'
// import qs from "querystring";
// import { MessageBox } from "element-ui";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // ['X-Token'] is a custom headers key
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  function (response) {
    // 任何在2xx范围的状态码都会触发此功能
    // ....
    return response
  },
  function (error) {
    // 任何超出2xx范围的状态码都会触发此功能
    // ...
    return Promise.reject(error)
  }
)

export default service