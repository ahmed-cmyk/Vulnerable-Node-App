<template>
  <form @submit.prevent="createPost" class="base form-basic">
    <h1 class="font-xl bold">Create Post</h1>
    <div class="flex direction-col gap-10">
      <label class="field-label" for="username">title</label>
      <input
        v-model="title"
        class="field-input"
        type="text"
        name="title"
        autocomplete="off" />
    </div>
    <div class="flex direction-col gap-10">
      <label class="field-label" for="body">body</label>
      <textarea
        v-model="body"
        id="body"
        name="body"
        rows="4"
        cols="50"></textarea>
    </div>
    <button class="btn btn-primary" type="submit">submit</button>
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
    async createPost() {
      const res = await this.$store.dispatch("createPost", {
        body: { id: this.id, title: this.title, body: this.body },
        token: this.token,
      });

      if (res.status === 200) {
        this.$store.dispatch("setMessage", "Post created successfully");
        this.$router.push({
          name: "post-detail",
          params: { id: res.data[0].id },
        });
      }
    },
  },
};
</script>
