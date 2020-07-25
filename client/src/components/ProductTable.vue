<template>
  <div class="scroable">
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th style="width: 50px">No.</th>
                <th style="width: 250px">Name</th>
                <th style="width: 250px">Image</th>
                <th style="width: 200px">Price</th>
                <th style="width: 100px">Stock</th>
                <th style="width: 250px">Action</th>
            </tr>
        </thead>
        <tbody>
            <Product v-for="(product, index) in products" :key="product.id" :product="product" :number="index"></Product>
        </tbody>
    </table>
    <h1 role="alert" v-if="products.length === 0">No Product! Create the Product</h1>
  </div>
</template>

<script>
import Product from './Product'
export default {
  name: 'product-table',
  data () {
    return {
    }
  },
  components: {
    Product
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>
.scroable {
  overflow-y: auto;
  height: 75vh;
}
</style>
