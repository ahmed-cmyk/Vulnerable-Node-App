<template>
  <form @submit.prevent="checkToken">
    <h2>Input token</h2>
    <div class="field">
      <input
        v-model="token"
        class="field-input"
        type="text"
        name="token"
        autocomplete="off"
        required />
      <label class="field-label" for="token">token</label>
    </div>
    <div class="field">
      <input class="field-submit" type="submit" value="submit" />
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
