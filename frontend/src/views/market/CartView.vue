<template>
  <section class="base cart">
    <h1 class="font-xl bold">Cart</h1>
    {{ user }}
    {{ items }}
    <div
      class="flex space-between cart_item"
      v-for="(item, index) in items"
      :key="index">
      <div>
        <h2 class="font-lg bold">{{ item.name }}</h2>
        <select name="quantity" id="quantity" v-model="item.quantity">
          <option value="1">Quantity: 1</option>
          <option value="2">Quantity: 2</option>
          <option value="3">Quantity: 3</option>
          <option value="4">Quantity: 4</option>
          <option value="5">Quantity: 5</option>
        </select>
      </div>
      <div>
        <p>
          <small>${{ item.price }}</small>
        </p>
        <button class="btn btn-danger">Delete</button>
      </div>
    </div>
    <div class="text-align-center">
      <h2 class="font-lg">
        <span class="bold">Total Price:</span> ${{ totalPrice }}
      </h2>
      <button class="btn btn-primary checkout" @click="checkout">
        Checkout
      </button>
    </div>
  </section>
</template>

<script>
export default {
  async mounted() {
    let foundIds = {};

    // Cycle through IDs and create a map to get number of occurences
    this.cart.map((item) => {
      foundIds[item.id] =
        foundIds[item.id] >= 5 ? 5 : (foundIds[item.id] || 0) + 1;
    });

    Object.keys(foundIds).map(async (id) => {
      let temp = await this.$store.dispatch("getProductById", Number(id));
      temp = {
        ...temp[0],
        quantity: foundIds[id],
      };

      this.items.push(temp);
    });
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    cart() {
      return this.$store.getters.getCart;
    },
    totalPrice() {
      if (this.items.length === 1) {
        return this.items[0].price * this.items[0].quantity;
      }

      return this.items.reduce((prev, curr) => {
        return prev + curr.price * curr.quantity;
      }, 0);
    },
    user() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    async checkout() {
      let orders = this.items.map((obj) => [obj.id, obj.quantity]);

      const status = await this.$store.dispatch("checkout", {
        customer_id: this.user.id,
        orders,
      });

      if (status === 200) {
        this.$store.dispatch("setMessage", "Order was successful!");
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
