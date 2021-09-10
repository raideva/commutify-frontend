import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import VerifyUser from '../views/VerifyUser.vue'
import ResetPwd from '../views/ResetPwd.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(store.state.auth.token==null)return next({name: 'Login'})
      next()
    }

  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(store.state.auth.token!=null)return next({name: 'Home'})
      next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if(store.state.auth.token!=null)return next({name: 'Home'})
      next()
    }
  },
  {
    path: '/verify/:email/:pin',
    name: 'VerifyUser',
    component: VerifyUser,
    beforeEnter: (to, from, next) => {
      if(store.state.auth.token!=null)return next({name: 'Home'})
      next()
    }
  },
  {
    path: '/resetpwd',
    name: 'ResetPwd',
    component: ResetPwd,
    beforeEnter: (to, from, next) => {
      if(store.state.auth.token!=null)return next({name: 'Home'})
      next()
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
