import market from "@/logic/market";

export default {
  namespace: true,
  state: () => ({
    orders: [],
  }),
  mutations: {
    setOrder(state, data) {
      state.orders = data;
    },
    addOrder(state, data) {
      state.orders.push(data);
    },
  },
  actions: {
    // async getOrders(context, user_id) {
    //   //
    // },
    async checkout(context, data) {
      const res = await market.create(data);
      console.log(res);
      return res.status;
    },
  },
};
