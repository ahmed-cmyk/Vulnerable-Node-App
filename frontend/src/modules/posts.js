import posts from "@/logic/post";

export default {
  namespace: true,
  state: () => ({ posts: [] }),
  mutations: {
    setPosts(state, data) {
      state.posts = data;
    },
    createPost(state, data) {
      state.posts.push(data);
    },
    updatePost(state, updatedpost) {
      const index = state.posts.findIndex(
        (post) => post._id === updatedpost._id
      );
      state.posts[index] = updatedpost;
    },
    deletePost(state, id) {
      const index = state.posts.findIndex((post) => post._id === id);
      state.posts.splice(index, 1);
    },
  },
  actions: {
    async getPosts(context, token) {
      const res = await posts.get(token);

      if (res && res.status === 200) {
        const posts = res.data;
        context.commit("setPosts", posts);
      }
    },
    async createPost(context, data) {
      const { body, token } = data;
      const res = await posts.create(body, token);

      if (res.status === 201) {
        context.commit("createpost", res.data);
      }

      return res;
    },
    async updatePost(context, data) {
      const { body, token } = data;
      const res = await posts.update(body.id, body, token);

      if (res.status === 200) {
        context.commit("updatepost", res.data);
      }

      return res.status;
    },
    async deletePost(context, data) {
      const { id, token } = data;
      const res = await posts.delete(id, token);

      if (res.status === 200) {
        context.commit("deletepost", id);
      }

      return res.status;
    },
  },
  getters: {
    getPostById: (state) => (id) => {
      const post = state.posts.filter((post) => post.id === Number(id));
      return post;
    },
    getPosts: (state) => {
      return state.posts;
    },
  },
};
