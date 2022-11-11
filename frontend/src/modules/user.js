import user from "@/logic/user";
import jwt_decode from "jwt-decode";

export default {
  namespace: true,
  state() {
    return {
      user: null,
      token: null,
    };
  },
  mutations: {
    addToken(state, data) {
      state.token = data;
    },
    removeToken(state) {
      state.token = null;
    },
    setUser(state, data) {
      state.user = data;
    },
    removeUser(state) {
      state.user = null;
    },
  },
  actions: {
    async login(context, creds) {
      const res = await user.login(creds);
      if (!res) return false;

      let token = res.data.token ?? null;

      if (res.status === 200 && token) {
        context.commit("addToken", token);
        context.commit("setUser", {
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
        });

        window.localStorage.setItem(
          "authToken",
          `bearer ${context.state.token}`
        );
        return true;
      }

      return false;
    },
    async register(context, creds) {
      const res = await user.register(creds);
      if (!res) return false;

      if (res.status === 200) return true;

      return false;
    },
    checkLocalStorage(context) {
      var token = window.localStorage.getItem("authToken");
      console.log("in local", token);
      if (token) {
        context.commit("addToken", token);
        context.dispatch("autoLogin");
      }
    },
    autoLogin({ state, commit }) {
      const data = jwt_decode(state.token);
      console.log(data);
      commit("setUser", data);
    },
    deleteToken({ commit }) {
      commit("removeToken");
      commit("removeUser");
    },
  },
};
