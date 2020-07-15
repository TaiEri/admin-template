

 /**
  * 通过cookie管理用户标识token
  */

import Cookies from 'js-cookie'

const TokenKey = 'user-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}