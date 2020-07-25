<template>
  <div class="text-center">
      <Jumbotron></Jumbotron>
      <router-view/>
  </div>
</template>

<script>
import Jumbotron from '../components/JumbotronCat'
export default {
  name: 'category-page',
  components: {
    Jumbotron
  }
}
</script>

<style>

</style>
