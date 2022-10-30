<template>
  <form class="form" @submit.prevent="login">
    <h1 class="font-xl bold">Login</h1>
    <table>
      <tr>
        <td><label class="field-label" for="email">email</label></td>
        <td>
          <input
            v-model="email"
            class="field-input"
            type="text"
            name="email"
            autocomplete="off"
            required />
        </td>
      </tr>
      <tr>
        <td><label class="field-label" for="password">password</label></td>
        <td>
          <input
            v-model="password"
            class="field-input"
            type="password"
            name="password"
            required />
        </td>
      </tr>
    </table>
    <div class="field">
      <input class="btn btn-primary" type="submit" value="Submit" />
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
