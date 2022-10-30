<template>
  <NavView />
  <BannerView />
  <router-view />
</template>

<script>
import BannerView from "@/components/BannerView.vue";
import NavView from "@/components/NavView.vue";

export default {
  components: {
    BannerView,
    NavView,
  },
};
</script>
