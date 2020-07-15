
/**
 * 集中处理路由相关的逻辑
 * 由后台保存绑定在用户属性中 roles=[role1,role2,...],每个路由带上这个标识来判断
 */

import { constantRoutes, asyncRoutes } from '@/router'

/**
 * 筛选当前用户的路由
 * @param {动态路由} routes 
 * @param {权限列表} roles 
 */
export function filterAsyncRoutes (routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      if (tmp.children) {
        tmp.children.length > 0 && res.push(tmp)
      } else {
        res.push(tmp)
      }
    }
  })
  return res
}

/**
 * 判断路由的权限标识是否在权限列表中
 * @param {权限列表} roles 
 * @param {路由} route 
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.role) {
    // 只要route的role标识在权限列表中
    return roles.some(role => route.meta.role === role)
  } else {
    return true
  }
}

const state = {
  routes: [], // 所有路由
  addRoutes: [] // 权限所拥有的路由
}

const mutations = {
  SET_ROUTES (state, data) {
    state.addRoutes = data
    state.routes = constantRoutes.concat(data)
  }
}

const actions = {
  // 生成路由
  generateRoutes ({ commit }, data) {
    return new Promise(resolve => {
      let accessedRoutes = filterAsyncRoutes(asyncRoutes, data)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}