<template>
    <div class="jumbotron m-0">
      <h1 class="display-4">List of Product</h1>
      <router-link :to="{ name: 'Add-Product'}"><button class="btn btn-primary btn-lg">Add Product</button></router-link>
    </div>
</template>

<script>
export default {
  name: 'jumbotron-product'
}
</script>

<style>

</style>
