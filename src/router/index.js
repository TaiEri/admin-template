import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
Vue.use(VueRouter)

//  解决vue-router升级引起的promise报错问题
const originalPush = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@views/login'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@views/home'),
        name: 'Home',
        meta: { title: '首页', icon: 'guide' }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@views/error-page/404'),
    hidden: true
  },
  {
    path: '/test1',
    component: Layout,
    redirect: '/test1/index',
    children: [
      {
        path: 'index',
        component: () => import('@views/test1'),
        name: 'Test1',
        meta: { title: 'test1', icon: 'guide' }
      }
    ]
  },
  {
    path: '/test2',
    component: Layout,
    redirect: '/test2/index',
    children: [
      {
        path: 'index',
        component: () => import('@views/test2'),
        name: 'Test2',
        meta: { title: 'test2', icon: 'guide' }
      }
    ]
  },
  {
    path: '/test3',
    component: Layout,
    redirect: '/test3/index',
    children: [
      {
        path: 'index',
        component: () => import('@views/test3'),
        name: 'Test3',
        meta: { title: 'test3', icon: 'guide' }
      }
    ]
  },
  {
    path: '/test4',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Test4',
    alwaysShow: true,
    meta: {
      title: 'test4',
      icon: 'guide'
    },
    children: [
      {
        path: 't4-1',
        component: () => import('@views/test4/t4-1.vue'),
        name: 'T4-1',
        meta: { title: 't4-1' }
      },
      {
        path: 't4-2',
        component: () => import('@views/test4/t4-2.vue'),
        hidden: true,
        name: 'T4-2',
        meta: { title: 't4-2' }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/test5',
    component: Layout,
    redirect: '/test5/index',
    children: [
      {
        path: 'index',
        component: () => import('@views/test3'),
        name: 'Test5',
        meta: { title: 'test5', icon: 'guide', role: 'ee' }
      }
    ]
  },
  {
    path: '/test6',
    component: Layout,
    redirect: '/test6/index',
    children: [
      {
        path: 'index',
        component: () => import('@views/test6'),
        name: 'Test6',
        meta: { title: 'test6', icon: 'guide', role: 'test6' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()
// router.addRoutes(asyncRoutes)
// 重置路由
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
