<template>
  <form @submit.prevent="createBlog">
    <h2>Create Blog</h2>
    <div class="field">
      <input
        v-model="title"
        class="field-input"
        type="text"
        name="title"
        autocomplete="off" />
      <label class="field-label" for="username">title</label>
    </div>
    <div class="field">
      <textarea
        v-model="body"
        id="body"
        name="body"
        rows="4"
        cols="50"></textarea>
      <label class="field-label" for="body">body</label>
    </div>
    <div class="field">
      <input class="field-button field-submit" type="submit" value="submit" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      body: "",
    };
  },
  computed: {
    token() {
      return this.$store.state.user.token;
    },
  },
  created() {
    this.$store.dispatch("checkLocalStorage");
  },
  methods: {
    async createBlog() {
      const res = await this.$store.dispatch("createBlog", {
        body: { id: this.id, title: this.title, body: this.body },
        token: this.token,
      });

      if (res.status === 201) {
        this.$store.dispatch("setMessage", "Blog created successfully");
        this.$router.push({
          name: "blog-detail",
          params: { id: res.data._id },
        });
      }
    },
  },
};
</script>
