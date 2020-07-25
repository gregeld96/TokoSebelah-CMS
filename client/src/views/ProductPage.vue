<template>
  <div class="text-center">
    <Jumbotron></Jumbotron>
    <router-view/>
  </div>
</template>

<script>
import Jumbotron from '../components/Jumbotron'
export default {
  name: 'product-page',
  components: {
    Jumbotron
  }
}
</script>

<style>

</style>
