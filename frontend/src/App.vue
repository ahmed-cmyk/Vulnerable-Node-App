<template>
  <nav>
    <div class="nav-left">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="nav-right">
      <router-link :to="{ name: 'login' }">Login</router-link>
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
  }
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
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
</style>
