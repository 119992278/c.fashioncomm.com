import Vue from 'vue'
import Router from 'vue-router'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
Vue.use(Router)
/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '图表展示',
    meta: { title: '图表展示', icon: 'example' },
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/manager/account')
    }]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '图表展示',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '图表展示', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/account',
    name: '超级管理员',
    meta: { title: '超级管理员', icon: 'example' },
    children: [
      {
        path: 'account',
        name: '账户管理',
        component: () => import('@/views/manager/account'),
        meta: { title: '账户管理', icon: '' }
      },
      {
        path: 'firmware',
        name: '固件管理',
        component: () => import('@/views/manager/firmware'),
        meta: { title: '固件管理', icon: '' }
      },
      {
        path: 'app',
        name: 'APP管理',
        component: () => import('@/views/manager/app'),
        meta: { title: 'APP管理', icon: '' }
      },
      {
        path: 'email',
        name: '邮件模板',
        component: () => import('@/views/errorPage/404'),
        meta: { title: '邮件模板', icon: '' }
      },
      {
        path: 'tickling',
        name: '意见反馈',
        component: () => import('@/views/errorPage/401'),
        meta: { title: '意见反馈', icon: '' }
      },
      {
        path: 'chart',
        name: '用户图表',
        component: () => import('@/views/manager/mixChart'),
        meta: { title: '用户图表', icon: '' }
      },
      {
        path: 'user',
        name: '用户列表',
        component: () => import('@/views/manager/user'),
        meta: { title: '用户列表', icon: '' }
      },
      {
        path: 'history',
        name: '操作历史',
        component: () => import('@/views/manager/history'),
        meta: { title: '操作历史', icon: '' }
      },
      {
        path: 'dial',
        name: '表盘管理',
        component: () => import('@/views/errorPage/404'),
        meta: { title: '表盘管理', icon: '' }
      }
    ]
  },
  {
    path: '/datas',
    component: Layout,
    redirect: '/example/list',
    name: '查看数据',
    meta: {
      title: '查看数据',
      icon: 'table'
    },
    children: [
      {
        path: 'list2',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: '查看用户数',
        meta: { title: '查看用户数' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: '每天注册',
            meta: { title: '每天注册' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        path: 'list2',
        component: () => import('@/views/errorPage/401'),
        name: '查看设备数量',
        meta: { title: '查看设备数量', icon: '' }
      },
      {
        path: 'list3',
        component: () => import('@/views/manager/mixChart'),
        name: '用户群体分析',
        meta: { title: '用户群体分析', icon: '' }
      },
      {
        path: 'list4',
        component: () => import('@/views/errorPage/404'),
        name: '用户列表',
        meta: { title: '用户列表', icon: '' }
      },
      {
        path: 'list5',
        component: () => import('@/views/errorPage/401'),
        name: '运动数据分析',
        meta: { title: '运动数据分析', icon: '' }
      },
      {
        path: 'list6',
        component: () => import('@/views/errorPage/404'),
        name: '重置用户密码',
        meta: { title: '重置用户密码', icon: '' }
      }
    ]
  },
  {
    path: '/extension',
    component: Layout,
    redirect: '/extension/list',
    name: '推广服务',
    meta: {
      title: '推广服务',
      icon: 'guide'
    },
    children: [
      {
        path: 'list1',
        component: () => import('@/views/errorPage/404'),
        name: '邮件推广',
        meta: { title: '邮件推广', icon: '' }
      },
      {
        path: 'list2',
        component: () => import('@/views/errorPage/404'),
        name: '短信邮件推广',
        meta: { title: '短信邮件推广', icon: '' }
      },
      {
        path: 'list3',
        component: () => import('@/views/errorPage/404'),
        name: 'APP消息推送',
        meta: { title: 'APP消息推送', icon: '' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/list',
    name: '设置',
    meta: {
      title: '设置',
      icon: 'component'
    },
    children: [
      {
        path: 'list1',
        component: () => import('@/views/errorPage/404'),
        name: 'APP设置',
        meta: { title: 'APP设置', icon: 'list' }
      },
      {
        path: 'list2',
        component: () => import('@/views/errorPage/404'),
        name: '固件设置',
        meta: { title: '固件设置', icon: 'component' }
      },
      {
        path: 'list3',
        component: () => import('@/views/errorPage/404'),
        name: '常见问题设置',
        meta: { title: '常见问题设置', icon: 'message' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: '查看数据1',
    hidden: true,
    meta: {
      title: '查看数据1',
      icon: 'clipboard'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: '错误信息',
    meta: {
      title: '错误信息',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
