<template>
  <form class="form" @submit.prevent="login">
    <h1 class="font-xl bold">Register</h1>
    <table>
      <tr>
        <td>
          <label for="name">name</label>
        </td>
        <td>
          <input type="text" name="name" id="name" />
        </td>
      </tr>
      <tr>
        <td>
          <label for="email">email</label>
        </td>
        <td>
          <input type="email" name="email" id="email" />
        </td>
      </tr>
      <tr>
        <td>
          <label for="password">password</label>
        </td>
        <td>
          <input type="password" name="password" id="password" />
        </td>
      </tr>
    </table>
    <button class="btn btn-primary" type="submit">submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
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
};
</script>
