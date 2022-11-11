<template>
  <nav>
    <div class="nav-left">
      <router-link to="/">Home</router-link>
      <router-link :to="{ name: 'merchandise' }">Merchandise</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div class="nav-right">
      <router-link :to="{ name: 'cart' }">
        <div class="cart" v-if="this.$route.name === 'merchandise'">
          <font-awesome-icon icon="fa-solid fa-cart-shopping" />
          <span class="cart-badge">0</span>
        </div>
      </router-link>
      <div v-if="user">
        <span class="welcome-message">Hello, {{ user.name }}</span>
        <button class="logout" @click="logout">logout</button>
      </div>
      <div v-else>
        <router-link :to="{ name: 'login' }" class="login-button">
          <button class="btn btn-action">Login</button>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    token() {
      return this.$store.state.user.token;
    },
    user() {
      return this.$store.state.user.user;
    },
  },
  beforeMount() {
    this.$store.dispatch("checkLocalStorage");
  },
  methods: {
    logout() {
      window.localStorage.removeItem("authToken");
      this.$store.dispatch("deleteToken");
    },
  },
};
</script>
