<template>
  <form @submit.prevent="sendForgetReq">
    <h2>Forgot password</h2>
    <div class="field">
      <span class="field-error">{{ error }}</span>
      <input
        v-model="email"
        class="field-input"
        type="text"
        name="email"
        autocomplete="off"
        required />
      <label class="field-label" for="username">email</label>
    </div>
    <div class="field">
      <input class="field-submit" type="submit" value="Submit" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      error: "",
    };
  },
  methods: {
    async sendForgetReq() {
      const status = await this.$store.dispatch("makeForgetRequest", {
        email: this.email,
      });
      this.$store.dispatch("setMessage", "Sent password recovery email");

      if (status === 200) {
        this.$router.push({ name: "password-token" });
        window.localStorage.setItem("email", this.email);
      }
    },
  },
};
</script>
