import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Login = resolve => require(['../views/common/Login.vue'], resolve)
const Home = resolve => require(['../views/common/Home.vue'], resolve)
const Page1 = resolve => require(['../views/module-one/page1.vue'], resolve)
const Page2 = resolve => require(['../views/module-one/page2.vue'], resolve)

export default new Router({
  routes: [
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
    }
  ]
})
