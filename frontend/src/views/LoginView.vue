<template>
  <form @submit.prevent="login">
    <h2>Login</h2>
    <div class="field">
      <input
        v-model="email"
        class="field-input"
        type="text"
        name="email"
        autocomplete="off"
        required />
      <label class="field-label" for="email">email</label>
    </div>
    <div class="field">
      <input
        v-model="password"
        class="field-input"
        type="password"
        name="password"
        required />
      <label class="field-label" for="password">password</label>
    </div>
    <div class="field">
      <input class="field-submit" type="submit" value="Submit" />
    </div>
    <router-link :to="{ name: 'forgot-password' }" class="link"
      >Forgot Password?</router-link
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const loginSucceeded = await this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });

      if (loginSucceeded) {
        this.$router.push({ name: "home" });
        this.$store.dispatch("setMessage", "Login Succeeded");
      }
    },
  },
  computed: {
    myToken() {
      return this.$store.state.token;
    },
  },
};
</script>
