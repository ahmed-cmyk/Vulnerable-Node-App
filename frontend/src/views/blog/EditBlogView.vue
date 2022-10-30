<template>
  <form @submit.prevent="editBlog">
    <h2>Edit Blog</h2>
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
      <button class="field-button field-cancel" @click="cancel">cancel</button>
      <input class="field-button field-submit" type="submit" value="submit" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      title: this.blog.title,
      body: this.blog.body,
    };
  },
  computed: {
    token() {
      return this.$store.state.user.token;
    },
  },
  props: {
    blog: Object,
  },
  created() {
    this.$store.dispatch("checkLocalStorage");
  },
  methods: {
    cancel() {
      this.$emit("toggle");
    },
    async editBlog() {
      const status = await this.$store.dispatch("updateBlog", {
        body: { id: this.id, title: this.title, body: this.body },
        token: this.token,
      });

      if (status === 200) {
        this.$store.dispatch("setMessage", "Blog updated successfully");
      }
    },
  },
};
</script>
