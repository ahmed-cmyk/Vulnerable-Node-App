<template>
  <nav>
    <div class="nav-left">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div class="nav-right">
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
  async created() {
    const check = await this.$store.dispatch("checkLocalStorage");

    if (check) {
      this.$store.dispatch("autoLogin");
    }
  },
  methods: {
    logout() {
      window.localStorage.removeItem("authToken");
      this.$store.dispatch("deleteToken");
    },
  },
};
</script>
