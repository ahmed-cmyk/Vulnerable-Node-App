import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/merchandise",
    name: "merchandise",
    // route level code-splitting
    // this generates a separate chunk (merchandise.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "merchandise" */ "../views/market/MarketView.vue"
      ),
  },
  {
    path: "/cart",
    name: "cart",
    // route level code-splitting
    // this generates a separate chunk (cart.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "cart" */ "../views/market/CartView.vue"),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/user/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/user/RegisterView.vue"),
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () =>
      import(
        /* webpackChunkName: "forgot-password" */ "../views/password/ForgotPasswordView.vue"
      ),
  },
  {
    path: "/password-token",
    name: "password-token",
    component: () =>
      import(
        /* webpackChunkName: "password-token" */ "../views/password/TokenPasswordView.vue"
      ),
  },
  {
    path: "/change-password/:id",
    name: "change-password",
    component: () =>
      import(
        /* webpackChunkName: "change-password" */ "../views/password/ChangePasswordView.vue"
      ),
  },
  {
    path: "/post/new",
    name: "post-create",
    component: () =>
      import(
        /* webpackChunkName: "post-create" */ "../views/post/CreatePostView.vue"
      ),
  },
  {
    path: "/post/:id",
    name: "post-detail",
    component: () =>
      import(
        /* webpackChunkName: "post-detail" */ "../views/post/ShowPostView.vue"
      ),
  },
  {
    path: "/post/:id/edit",
    name: "post-edit",
    component: () =>
      import(
        /* webpackChunkName: "post-edit" */ "../views/post/EditPostView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
