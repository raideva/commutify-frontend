import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import VerifyUser from '../views/VerifyUser.vue'
import ResetPwd from '../views/ResetPwd.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/verify/:email/:pin',
    name: 'VerifyUser',
    component: VerifyUser
  },
  {
    path: '/resetpwd',
    name: 'ResetPwd',
    component: ResetPwd
  }
]

const router = new VueRouter({
  routes
})

export default router
