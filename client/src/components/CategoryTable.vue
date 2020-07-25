<template>
  <div class="scroable">
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th>No.</th>
                <th>Category</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <Category v-for="(category, index) in categories" :key="category.id" :category="category" :number="index"></Category>
        </tbody>
    </table>
    <h1 role="alert" v-if="categories.length === 0">No Category! Create the Category</h1>
  </div>
</template>

<script>
import Category from './Category'
export default {
  name: 'category-table',
  data () {
    return {
    }
  },
  components: {
    Category
  },
  computed: {
    categories () {
      return this.$store.state.categories
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
