import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken, getCookie } from '@/utils/auth' // 验权
import { isEmptyObject } from '@/utils/index' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // next()
      if (store.getters.roles.length === 0) {
        store.dispatch('GetAccountAuthority', { customerAccountId: getCookie('customerAccountId') }).then(res => { // 拉取用户权限
          store.dispatch('GenerateRoutes', { roles: ['admin'] }).then(() => {
            router.addRoutes(store.getters.addRouters) // 添加动态路由
            next({ ...to, replace: true })
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
