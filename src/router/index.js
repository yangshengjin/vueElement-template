import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Index = resolve => require(['../views/common/Index.vue'], resolve)

const Login = resolve => require(['../views/common/Login.vue'], resolve)
const Home = resolve => require(['../views/common/Home.vue'], resolve)
const Page1 = resolve => require(['../views/module-one/page1.vue'], resolve)
const Page2 = resolve => require(['../views/module-one/page2.vue'], resolve)
const errorPage401 = resolve =>
  require(['../views/errorPage/401.vue'], resolve)
const errorPage404 = resolve =>
  require(['../views/errorPage/404.vue'], resolve)
export default new Router({
  routes: [
    {
      path: '/',
      name: '主页',
      meta: { isConstant: true },
      children: [
        {
          path: '/index',
          name: '首页',
          component: Index,
          meta: { isConstant: true }
        }
      ],
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      name: '基本信息',
      iconCls: '',
      children: [
        { path: '/page1', component: Page1, name: '选项一' },
        { path: '/page2', component: Page2, name: '选项二' }
      ]
    },
    {
      path: '/error',
      component: Home,
      redirect: 'noredirect',
      name: '错误页面',
      icon: '404',
      children: [
        {
          path: '/401',
          component: errorPage401,
          name: '401',
          meta: { isConstant: true }
        },
        {
          path: '/404',
          component: errorPage404,
          name: '404',
          meta: { isConstant: true }
        }
      ]
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
})
