<template>
  <main class="home">
    <section class="blog_list" v-if="blogs.length">
      <div class="blog" v-for="blog in blogs" :key="blog.id">
        <router-link :to="{ name: 'blog-detail', params: { id: blog.id } }">{{
          blog.title
        }}</router-link>
      </div>
    </section>
    <div v-else>login to view blogs...</div>
  </main>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("checkLocalStorage");
    this.$store.dispatch("getBlogs", this.token);
  },
  computed: {
    token() {
      return this.$store.state.user.token;
    },
    blogs() {
      return this.$store.state.blog.blogs;
    },
  },
};
</script>
