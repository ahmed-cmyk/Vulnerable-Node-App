<template>
  <nav>
    <div class="nav-left">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="nav-right">
      <div v-if="user">
        <span class="welcome-message">Hello, {{ user.username }}</span>
        <button class="logout" @click="logout">logout</button>
      </div>
      <div v-else>
        <router-link :to="{ name: 'login' }">Login</router-link>
      </div>
    </div>
  </nav>
  <BannerView />
  <router-view/>
</template>

<script>
import BannerView from '@/components/BannerView.vue'

export default {
  components: {
    BannerView
  },
  computed: {
    token() {
      return this.$store.state.user.token
    },
    user() {
      return this.$store.state.user.user
    }
  },
  async created() {
    const check = await this.$store.dispatch('checkLocalStorage')

    if(check) {
      this.$store.dispatch('autoLogin')
    }
  },
  methods: {
    logout() {
      window.localStorage.removeItem('authToken')
      this.$store.dispatch('deleteToken')
    }
  }
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}
body,
h1, h2, h3 {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
nav {
  background: #000;
  padding: 30px;
  text-decoration: none;
}
.nav-left {
  float: left;
}
.nav-right {
  float: right;
}
nav a {
  font-weight: bold;
  color: #fff;
}
nav a.router-link-exact-active {
  color: #42b983;
}
.welcome-message {
  color: #fff;
}
.logout {
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  margin-left: 5px;
  padding: 5px;
}
</style>
