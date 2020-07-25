<template>
  <div class="text-center">
      <h1 class="my-4">{{ category.name }}</h1>
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
                <Product v-for="(product, index) in category.Products" :key="product.id" :product="product" :number="index"></Product>
            </tbody>
        </table>
        <h1 role="alert" v-if="category.Products.length === 0">No Product in this Category</h1>
      </div>
  </div>
</template>

<script>
import Product from '../components/Product'
export default {
  name: 'detail-category',
  components: {
    Product
  },
  computed: {
    category () {
      return this.$store.state.selectCategory
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
