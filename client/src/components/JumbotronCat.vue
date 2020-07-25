<template>
    <div class="jumbotron m-0">
      <h1 class="display-4">List of Category</h1>
      <router-link :to="{ name: 'Add-Category'}"><button class="btn btn-primary btn-lg">Add Category</button></router-link>
    </div>
</template>

<script>
export default {
  name: 'jumbotron-category'
}
</script>

<style>

</style>
