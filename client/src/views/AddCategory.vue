<template>
    <div class="my-2">
        <div class="alert alert-warning" role="alert" v-if="message">{{ message }}</div>
        <form @submit.prevent="addCategory" class="my-2 universal-form mx-auto">
                <div class="form-group">
                    <label><h4>Category Name</h4></label>
                    <input type="text" class="form-control w-50 mx-auto" v-model="name" />
                </div>
                <button type="submit" class="btn btn-primary my-4"> Submit </button>
        </form>
    </div>
</template>

<script>
export default {
  name: 'add-category',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    addCategory () {
      this.$store.dispatch('addCategory', {
        name: this.name
      })
      this.name = ''
    }
  },
  computed: {
    message () {
      return this.$store.state.message
    }
  }
}
</script>

<style>

</style>
