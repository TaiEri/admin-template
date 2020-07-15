

 /**
  * 管理用户相关全局数据
  */

import { getToken, setToken, removeToken } from '@utils/auth'
import { loginReq, logoutReq, getInfoReq } from '@api/user'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(), // 用户标识
  name: '', // 用户名称
  avatar: '', // 用户头像
  roles: [] // 用户菜单权限列表
}

const mutations = {
  SET_TOKEN (state, data) {
    state.token = data
  },
  SET_ROLES (state, data) {
    state.roles = data
  },
  SET_NAME (state, data) {
    state.name = data
  },
  SET_AVATAR (state, data) {
    state.avatar = data
  }
}

const actions = {
  // 登录
  login ({ commit }, data) {
    const { username, password } = data
    return new Promise((resolve, reject) => {
      loginReq({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        // cookie保存
        console.log('登录记录cookie', response)
        // document.cookie = 'name=hahah'
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 登出
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      logoutReq().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        // 清除cookie中的token
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户个人信息
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfoReq(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('需要重新登录')
        }
        const { roles, name, avatar } = data
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 重置所有token标识
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
  // 动态修改角色权限
  changeRoles ({ commit, dispatch }, role) {
    // eslint-disable-next-line
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}