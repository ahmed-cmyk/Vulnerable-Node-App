<template>
  <main v-if="blog" class="detailView">
    <section v-if="!editMode">
      <div class="flex justify-end">
        <button class="btn btn-primary" @click="toggleEdit">edit</button>
        <button class="btn btn-danger" @click="callDelete">delete</button>
      </div>
      <div class="card">
        <h1 class="bold font-heading">{{ blog.title }}</h1>
        <p>{{ blog.body }}</p>
      </div>
    </section>
    <section v-else>
      <EditBlogView :blog="blog" @toggle="toggleEdit" />
    </section>

    <section class="my-2">
      <div class="flex justify-end">
        <button
          class="btn"
          :class="commentMode ? 'btn-danger' : 'btn-primary'"
          @click="toggleComment">
          {{ commentButton }}
        </button>
      </div>
      <CreateView v-show="commentMode" @created="toggleComment" />
    </section>

    <section class="my-2" v-if="comments.length">
      <div class="card comments">
        <h2 class="bold font-subheading">
          Comments <span class="badge">{{ comments.length }}</span>
        </h2>
        <div v-for="(comment, index) in comments" class="comment" :key="index">
          <p>{{ comment.comment }}</p>
          <small>-- {{ comment.author }}</small>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import CreateView from "@/views/comments/CreateView.vue";
import EditBlogView from "./EditBlogView.vue";
export default {
  data() {
    return {
      commentMode: false,
      commentButton: "Add Comment",
      id: this.$route.params.id,
      editMode: false,
    };
  },
  computed: {
    blog() {
      return this.$store.getters.getBlogById(this.id)[0];
    },
    comments() {
      return this.$store.getters.getComments;
    },
    token() {
      return this.$store.state.user.token;
    },
    user() {
      return this.$store.state.user.user;
    },
  },
  created() {
    this.$store.dispatch("checkLocalStorage");
    this.$store.dispatch("getBlogs", this.token);
    this.$store.dispatch("getComments", { post_id: this.id });
  },
  unmounted() {
    this.$store.dispatch("clearComments");
  },
  methods: {
    toggleComment() {
      this.commentMode = !this.commentMode;
      this.commentButton = this.commentMode ? "Cancel" : "Add Comment";
    },
    toggleEdit() {
      this.editMode = !this.editMode;
    },
    async callDelete() {
      const status = await this.$store.dispatch("deleteBlog", {
        id: this.id,
        token: this.token,
      });
      console.log(status);
      if (status === 200) {
        this.$store.dispatch("setMessage", "Blog deleted successfully");
        this.$router.push({ name: "home" });
      }
    },
  },
  components: { CreateView, EditBlogView },
};
</script>
