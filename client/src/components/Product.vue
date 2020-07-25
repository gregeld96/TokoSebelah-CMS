<template>
  <tr>
    <th scope="row">{{ number+1 }}</th>
    <td>{{ product.name }}</td>
    <td>
        <img :src="product.image_url" alt="Product Pic" width="150px">
    </td>
    <td>Rp. {{ product.price }}</td>
    <td>{{ product.stock }}</td>
    <td>
        <button @click="editBtn" class="btn btn-info mr-2">Edit</button>
        <button @click="deleteBtn" class="btn btn-info">Delete</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'product-detail',
  props: ['number', 'product'],
  methods: {
    deleteBtn () {
      this.$store.dispatch('deleteProduct', this.product.id)
    },
    editBtn () {
      this.$store.dispatch('selectedProduct', this.product)
    }
  }
}
</script>

<style>

</style>
