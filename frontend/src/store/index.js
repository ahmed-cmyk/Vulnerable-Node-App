import { createStore } from "vuex";
import bannerModule from "@/modules/banner";
import postModule from "@/modules/posts";
import productModule from "@/modules/products";
import marketModule from "@/modules/market";
import commentModule from "@/modules/comments";
import userModule from "@/modules/user";
import recoveryModule from "@/modules/recovery";

export default createStore({
  modules: {
    banner: bannerModule,
    post: postModule,
    product: productModule,
    market: marketModule,
    comment: commentModule,
    recovery: recoveryModule,
    user: userModule,
  },
});
