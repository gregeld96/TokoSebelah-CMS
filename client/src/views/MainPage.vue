<template>
  <div id="page" class="d-flex align-items-stretch" style="height: 100vh;">
      <div style="background: gray; height: 100vh; width: 20vw;">
        <SideBar></SideBar>
      </div>
      <div style="width: 80vw;">
        <router-view/>
      </div>
  </div>
</template>

<script>
import SideBar from '../components/SideBar'
export default {
  name: 'main-page',
  components: {
    SideBar
  },
  methods: {
    fetchCategory () {
      this.$store.dispatch('fetchCategory')
    },
    fetchProduct () {
      this.$store.dispatch('fetchProduct')
    }
  },
  created () {
    this.fetchCategory()
    this.fetchProduct()
  }
}
</script>

<style>
#page {
  overflow: hidden;
  break-inside: avoid;
}

a.router-link-exact-active {
  color: black;
}
</style>
