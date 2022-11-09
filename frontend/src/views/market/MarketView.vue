<template>
  <section class="market">
    <!-- Shirt https://unsplash.com/photos/WWesmHEgXDs -->
    <!-- Jeans https://unsplash.com/photos/Zy6oNZRdcjc -->
    <!-- Shoes https://unsplash.com/photos/a-QH9MAAVNI -->
    <!-- From https://unsplash.com/photos/Yyt1n2H822A -->
    <div class="listing" v-for="product in products" :key="product.id">
      <div class="listing_img">
        <img :src="getImage(product.path)" />
        <div class="listing_overlay">
          <button class="btn btn-primary" @click="addToCart(product)">
            Add to Cart
          </button>
        </div>
      </div>
      <div class="listing_details">
        <h1>{{ product.name }}</h1>
        <small>${{ product.price }}</small>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getProducts");
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
  },
  methods: {
    getImage(img) {
      return require(`@/assets/images/${img}.jpg`);
    },
    addToCart(product) {
      this.$store.dispatch("addToCart", product);
    },
  },
};
</script>
