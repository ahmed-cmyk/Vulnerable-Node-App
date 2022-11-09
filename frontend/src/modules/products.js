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
  },
  actions: {
    async getProducts(context) {
      const res = await products.get();

      if (res.status === 200) {
        context.commit("setProducts", res.data);
      }
    },
    async getProductById({ state }, id) {
      return state.products.filter((item) => item.id === id);
    },
    async addToCart(context, data) {
      context.commit("addProduct", data);
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
