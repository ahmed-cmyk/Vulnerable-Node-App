<template>
  <div
    v-if="bannerMessage"
    class="banner"
    :class="{ 'banner-error': errorState }">
    <span class="banner-text">{{ bannerMessage }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    bannerMessage() {
      return this.$store.state.banner.message;
    },
    errorState() {
      return this.$store.state.banner.errorState;
    },
  },
  watch: {
    bannerMessage() {
      setTimeout(() => {
        this.$store.dispatch("setBlank");
      }, 5000);
    },
  },
};
</script>
