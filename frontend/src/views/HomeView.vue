<template>
  <main class="base">
    <div class="flex justify-end">
      <router-link :to="{ name: 'post-create' }">
        <button class="btn btn-primary">Add new post</button>
      </router-link>
    </div>
    <section class="post_list" v-if="posts.length">
      <div class="post" v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'post-detail', params: { id: post.id } }">{{
          post.title
        }}</router-link>
      </div>
    </section>
    <div v-else>login to view posts...</div>
  </main>
</template>

<script>
export default {
  beforeMount() {
    this.$store.dispatch("checkLocalStorage");
    this.$store.dispatch("getPosts", this.token);
  },
  computed: {
    token() {
      return this.$store.state.user.token;
    },
    posts() {
      return this.$store.state.post.posts;
    },
  },
};
</script>
