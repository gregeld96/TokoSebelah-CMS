<template>
  <div class="body text-center">
      <img class="mx-auto not-found" src="https://cdn.dribbble.com/users/1963449/screenshots/5915645/404_not_found.png" alt="Not Found Page">
      <router-link :to="{ name: 'ProductTable'}"><h4 class="py-3 mx-2">Go to Product</h4></router-link>
  </div>
</template>

<script>
export default {
  name: 'not-found-page'
}
</script>

<style>
.not-found{
    width: 50vw;
    height: 50vh;
}
</style>
