<template>
  <form @submit.prevent="sendForgetReq" class="form">
    <h1 class="font-xl bold">Forgot password</h1>
    <div class="field mt-5">
      <label class="field-label" for="username">email</label>
      <input
        v-model="email"
        class="field-input"
        type="text"
        name="email"
        autocomplete="off"
        required />
      <span class="field-error">{{ error }}</span>
    </div>
    <div class="field">
      <input class="btn btn-primary" type="submit" value="Submit" />
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
