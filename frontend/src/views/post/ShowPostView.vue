<template>
  <main v-if="post" class="detailView">
    <section v-if="!editMode">
      <div class="flex justify-end">
        <button class="btn btn-primary" @click="toggleEdit">edit</button>
        <button class="btn btn-danger" @click="callDelete">delete</button>
      </div>
      <div class="card">
        <h1 class="bold font-heading">{{ post.title }}</h1>
        <p>{{ post.body }}</p>
      </div>
    </section>
    <section v-else>
      <EditPostView :post="post" @toggle="toggleEdit" />
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
import EditPostView from "./EditPostView.vue";
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
    post() {
      return this.$store.getters.getPostById(this.id)[0];
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
    this.$store.dispatch("getPosts", this.token);
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
      const status = await this.$store.dispatch("deletePost", {
        id: this.id,
        token: this.token,
      });
      console.log(status);
      if (status === 200) {
        this.$store.dispatch("setMessage", "Post deleted successfully");
        this.$router.push({ name: "home" });
      }
    },
  },
  components: { CreateView, EditPostView },
};
</script>
