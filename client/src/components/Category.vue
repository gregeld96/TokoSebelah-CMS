<template>
  <tr>
    <th scope="row">{{ number+1 }}</th>
    <td>{{ category.name }}</td>
    <td>
        <button @click="viewBtn" class="btn btn-info mr-2">View Product</button>
        <button @click="deleteBtn" class="btn btn-info">Delete</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'category-detail',
  props: ['number', 'category'],
  methods: {
    deleteBtn () {
      this.$store.dispatch('deleteCategory', this.category.id)
    },
    viewBtn () {
      this.$store.dispatch('selectedCategory', this.category.name)
    }
  }
}
</script>

<style>

</style>
