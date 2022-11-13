import products from "@/logic/product";

export default {
  namespace: true,
  state: () => ({
    cart: [],
    products: [],
  }),
  mutations: {
    setProducts(state, data) {
      state.products = data;
    },
    addProduct(state, data) {
      state.cart.push(data);
    },
    deleteProduct(state, id) {
      const index = state.cart.findIndex((cart) => cart.id === id);
      console.log(index, id);
      if (index < 0) return;
      state.cart.splice(index, 1);
    },
    clearProducts(state) {
      state.cart = [];
    },
  },
  actions: {
    async getProducts(context) {
      const res = await products.get();

      if (res.status === 200) {
        context.commit("setProducts", res.data);
      }
    },
    async getProductById({ state }, id) {
      return state.cart.filter((item) => item.id === id);
    },
    searchCart({ state }, id) {
      for (let i = 0; i < state.cart.length; i++) {
        console.log(state.cart[i]);
        if (state.cart[i].id === id) {
          return i;
        }
      }
      return -1;
    },
    initProduct({ commit }, data) {
      data = { ...data, quantity: 1 };
      commit("addProduct", data);
      return;
    },
    async addToCart({ dispatch, state }, data) {
      if (!state.cart.length) {
        return dispatch("initProduct", data);
      }
      const index = await dispatch("searchCart", data.id);
      console.log(index);
      if (index < 0) {
        return dispatch("initProduct", data);
      }

      state.cart[index].quantity = (state.cart[index].quantity || 0) + 1;
    },
    incrementQuantity({ state }, data) {
      const { index, quantity } = data;
      state.cart[index] = {
        ...state.cart[index],
        quantity,
      };
    },
    removeFromCart(context, id) {
      context.commit("deleteProduct", id);
    },
    emptyCart(context) {
      context.commit("clearProducts");
    },
  },
  getters: {
    getProducts: (state) => {
      return state.products;
    },
    getCart: (state) => {
      return state.cart;
    },
  },
};
