import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import(/* webpackChunkName: "forgot-password" */ '../views/password/ForgotPasswordView.vue')
  },
  {
    path: '/password-token',
    name: 'password-token',
    component: () => import(/* webpackChunkName: "password-token" */ '../views/password/TokenPasswordView.vue')
  },
  {
    path: '/change-password/:id',
    name: 'change-password',
    component: () => import(/* webpackChunkName: "change-password" */ '../views/password/ChangePasswordView.vue')
  },
  {
    path: '/blog/new',
    name: 'blog-create',
    component: () => import(/* webpackChunkName: "blog-create" */ '../views/blog/CreateBlogView.vue')
  },
  {
    path: '/blog/:id',
    name: 'blog-detail',
    component: () => import(/* webpackChunkName: "blog-detail" */ '../views/blog/BlogDetailView.vue')
  },
  {
    path: '/blog/:id/edit',
    name: 'blog-edit',
    component: () => import(/* webpackChunkName: "blog-edit" */ '../views/blog/EditBlogView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
