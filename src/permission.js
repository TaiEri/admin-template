
/**
 * 处理权限的路由跳转
 */
import router from './router'
import store from './store'
import { getToken } from './utils/auth'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

router.beforeEach(async (to, from, next) => {
  // 进度条开启
  NProgress.start()
  // 1.获得已经登录的包含用户信息的标识
  const token = getToken()
  console.log('获取token===============', token)
  // 2.判断登录情况
  if (token) {
    // 判断路径走向
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 判断当前用户权限(其实还是验证是否已登录)
      const roles = store.getters.roles && store.getters.roles.length > 0
      if (roles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo')
          // 此时如果验证登录有误,需要动态生成路由
          const accessRoutes = await store.dispatch('routerPermissions/generateRoutes', roles)
          // 动态添加路由
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
          // next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    if (to.path.indexOf('/login') !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})