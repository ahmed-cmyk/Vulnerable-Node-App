<template>
  <form @submit.prevent="checkToken" class="form">
    <h1 class="font-xl bold">Input token</h1>
    <div class="field mt-5">
      <label class="field-label" for="token">token</label>
      <input
        v-model="token"
        class="field-input"
        type="text"
        name="token"
        autocomplete="off"
        required />
    </div>
    <div class="field">
      <input class="btn btn-primary" type="submit" value="submit" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: window.localStorage.getItem("email"),
      token: 0,
    };
  },
  methods: {
    checkToken() {
      const storedToken = this.$store.getters.getTokenByEmail(this.email);
      const changeId = this.generateChangeId();

      if (storedToken === Number(this.token)) {
        this.$router.push({
          name: "change-password",
          params: { id: changeId },
        });
      }
    },
    generateChangeId() {
      const changeId = Math.floor(100000000 + Math.random() * 900000000);
      const check = this.$store.dispatch("storeChangeId", {
        email: this.email,
        changeId: changeId,
      });

      if (!check) {
        return this.generateChangeId();
      }

      return changeId;
    },
  },
};
</script>
