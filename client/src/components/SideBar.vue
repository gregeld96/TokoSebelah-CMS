<template>
    <div class="text-center">
        <h1 class="my-5">CMS TOKOSEBELAH</h1>
        <router-link :to="{ name: 'ProductTable'}"><h4 class="bg-light py-3 mx-2">Product</h4></router-link>
        <router-link :to="{ name: 'CategoryTable'}"><h4 class="bg-light py-3 mx-2">Category</h4></router-link>
        <button class="bg-light py-3 px-5" @click="logout()">Logout</button>
    </div>
</template>

<script>
export default {
  name: 'side-bar',
  methods: {
    logout () {
      this.$store.dispatch('userLogout')
    }
  }
}
</script>

<style>

</style>
