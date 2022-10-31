<template>
  <form @submit.prevent="editBlog" class="form-basic">
    <h1 class="font-xl bold">Edit Blog</h1>
    <table>
      <tr>
        <td>
          <label class="field-label" for="username">title</label>
        </td>
        <td>
          <input
            v-model="title"
            class="field-input"
            type="text"
            name="title"
            autocomplete="off" />
        </td>
      </tr>
      <tr>
        <td>
          <label class="field-label" for="body">body</label>
        </td>
        <td>
          <textarea
            v-model="body"
            id="body"
            name="body"
            rows="4"
            cols="50"></textarea>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <button class="btn btn-danger" @click="cancel">cancel</button>
          <button class="btn btn-primary" type="submit">submit</button>
        </td>
      </tr>
    </table>
    <div></div>
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
        this.$emit("toggle");
      }
    },
  },
};
</script>
