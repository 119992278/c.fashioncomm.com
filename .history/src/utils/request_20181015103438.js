import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { errorMsg } from '@/utils/index'
import { getToken, getCookie } from '@/utils/auth'
import i18n from '@/lang'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 60000 // 请求超时时间
})

// request拦截器 每个请求自带header
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['accessToken'] = getToken()
    config.headers['accessSeq'] = new Date().getTime()
    config.headers['customerAccountId'] = getCookie('customerAccountId')
    config.headers['customerId'] = getCookie('customerId')
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 0) {
      Message({
        // message: res.msg,
        message: errorMsg(res.code),
        type: 'error',
        duration: 5 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === -9526 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: i18n.t('table.cancel'),
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service