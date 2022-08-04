<template>
  <div class="home">
    <div v-for="blog in blogs" :key="blog._id">
      <router-link :to="{ name: 'blog-detail', params: { id: blog._id } }">{{ blog.title }}</router-link>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('checkLocalStorage')
    console.log(this.token)
    this.$store.dispatch('getBlogs', this.token)
  },
  computed: {
    token() {
      return this.$store.state.user.token
    },
    blogs() {
      return this.$store.state.blog.blogs
    }
  }
}
</script>
