import { createStore } from "vuex";
import bannerModule from "@/modules/banner";
import blogModule from "@/modules/blogs";
import commentModule from "@/modules/comments";
import userModule from "@/modules/user";
import recoveryModule from "@/modules/recovery";

export default createStore({
  modules: {
    banner: bannerModule,
    blog: blogModule,
    comment: commentModule,
    recovery: recoveryModule,
    user: userModule,
  },
});
