import request from "@utils/request.js"
// import qs from "querystring"

export function loginReq (data) {
  return request({
    url: "/user/login",
    method: "post",
    data
  })
}

export function logoutReq (data) {
  return request({
    url: "/user/logout",
    method: "post",
    data
  })
}

export function getInfoReq (data) {
  return request({
    url: "/user/info",
    method: "get",
    params: { data }
  })
}