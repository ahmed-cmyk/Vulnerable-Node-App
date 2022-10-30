<template>
  <form @submit.prevent="updatePassword" v-if="validEmail" class="form">
    <h1 class="font-xl bold">Reset password</h1>
    <table>
      <tr>
        <td>
          <label class="field-label" for="email">Email</label>
        </td>
        <td>
          <input
            v-model="validEmail"
            class="field-input"
            type="email"
            name="email"
            autocomplete="off"
            disabled />
        </td>
      </tr>
      <tr>
        <td>
          <label class="field-label" for="password">New Password</label>
        </td>
        <td>
          <input
            v-model="password"
            class="field-input"
            type="password"
            name="password"
            autocomplete="off" />
        </td>
      </tr>
    </table>
    <input class="btn btn-primary" type="submit" value="Submit" />
  </form>
  <div class="field text-align-center mt-10 font-xl bold" v-else>
    Email is missing
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
    };
  },
  computed: {
    changeId() {
      return this.$route.params.id;
    },
    validEmail() {
      return this.$store.getters.getEmailByChangeId(this.changeId);
    },
  },
  methods: {
    async updatePassword() {
      const check = await this.$store.dispatch("changePassword", {
        email: this.validEmail,
        password: this.password,
      });
      if (check) {
        this.$router.push({ name: "login" });
        this.$store.dispatch("setMessage", "Password changed successfully");
      } else {
        this.$store.dispatch(
          "setErrorMessage",
          "Password change request failed"
        );
      }
    },
  },
};
</script>
