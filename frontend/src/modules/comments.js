import comments from "@/logic/comment";

export default {
  namespace: true,
  state: () => ({ comments: [] }),
  mutations: {
    setComments(state, data) {
      state.comments = data;
    },
    createComment(state, data) {
      console.log(data);
      console.log(...state.comments);
      state.comments = [...state.comments, ...data];
    },
    emptyComments(state, data) {
      state.comments = data;
    },
  },
  actions: {
    async getComments(context, data) {
      const { comment_id } = data;
      const res = await comments.get(comment_id);

      if (res.status === 200) {
        context.commit("setComments", res.comments);
      }

      return res;
    },
    async addComment(context, data) {
      const { body, token } = data;
      const res = await comments.create(body, token);
      console.log(res.status, res.comment);
      if (res.status === 201) {
        context.commit("createComment", res.comment);
      }

      return res.status;
    },
    async clearComments(context) {
      context.commit("emptyComments");
    },
  },
  getters: {
    getComments: (state) => {
      return state.comments;
    },
  },
};
