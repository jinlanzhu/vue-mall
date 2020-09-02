import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../views/login/Login'
import "../assets/css/global.css"

const Login = () => import('views/login/Login.vue')
const Home = () => import('views/home/Home.vue')
const Welcome = () => import('views/home/childComps/Welcome.vue')
const Users = () => import('views/users/Users.vue')
const Rights = () => import('views/power/rights/Rights.vue')
const Roles = () => import('views/power/roles/Roles.vue')
<<<<<<< HEAD
const Cate = () => import('views/goods/goodsCate/Cate.vue')
const Params = () => import('views/goods/goodsParams/Params.vue')
=======
const Goods = () => import('views/goods/goodsList/Goods.vue')
const Add = () => import('views/goods/goodsList/Add.vue')
>>>>>>> goods_list


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome
      },
      {
        path: '/users',
        name: 'Users',
        component: Users
      },
      {
        path: '/rights',
        name: 'Rights',
        component: Rights
      },
      {
        path: '/roles',
        name: 'Roles',
        component: Roles
      },
      {
<<<<<<< HEAD
        path: '/categories',
        name: Cate,
        component: Cate
      },
      {
        path: '/params',
        name: Params,
        component: Params
=======
        path: '/goods',
        name: 'Goods',
        component: Goods
      },
      {
        path: '/goods/add',
        name: 'addGoods',
        component: Add
>>>>>>> goods_list
      }
    ]
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

/**
 * 登录验证，判断是否进行登录而进入的后台
 * 设置一个全局的前置守卫
 */
router.beforeEach((to, from, next) => {
  // 判断即将要去的是否是登录页面，是就放行
  if (to.path === '/login') {
    return next()
  }
  //获取token值
  const tokenStr = window.sessionStorage.getItem('token')
  // 判断是否有token值，若没有，则跳转到登录页面
  if (!tokenStr) {
    next('/login')
  }
  next()

})

export default router
