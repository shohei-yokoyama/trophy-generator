import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Create from '@/views/Create.vue'
import Mypage from '@/views/Mypage.vue'
import LoginForm from "@/views/LoginForm"
import store from '../store'
import Search from "@/views/Search"
import Rule from "@/views/rule"
import Contact from "@/views/Contact"

// import firebase from 'firebase'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    meta: {requiresAuth: true}
  },
  {
    path: "/mypage",
    name: "mypage",
    component: Mypage,
  },
  {
    path: "/loginform",
    name: "loginform",
    component: LoginForm,
  },
  {
    path: "/search",
    name: "search",
    component: Search
  },
  {
    path: "/rule",
    name: "rule",
    component: Rule
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth) && !store.state.user) {
    next({path: "/loginform", query: {redirect: to.fullpath}});
  } else {
    next();
  }
})


export default router
