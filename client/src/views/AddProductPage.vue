<template>
    <div>
        <div class="alert alert-warning" role="alert" v-if="message">{{ message }}</div>
        <form @submit.prevent="addProduct" class="my-2 universal-form mx-auto">
                <div class="form-group">
                    <label><h4>Product Name</h4></label>
                    <input type="text" class="form-control w-50 mx-auto" v-model="name" id="title-add" />
                </div>
                <div class="form-group">
                    <label><h4>Image Url</h4></label>
                    <input type="text" class="form-control w-50 mx-auto" v-model="image_url" id="description-add" />
                </div>
                <div class="d-flex my-2 justify-content-center">
                    <div class="form-group mx-5">
                        <label><h4>Price</h4></label>
                        <input type="number" class="form-control" v-model="price" />
                    </div>
                    <div class="form-group mx-5">
                        <label><h4>Stock</h4></label>
                        <input type="number" class="form-control" v-model="stock" />
                    </div>
                </div>
                <div class="input-group w-50 mx-auto">
                    <div class="input-group-append">
                      <label class="input-group-text" for="inputGroupSelect02">Category</label>
                    </div>
                    <select class="custom-select" v-model="categoryId">
                        <option v-for="category in categories" :key="category.id" :value='category.id' selected>{{category.name}}</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary my-4"> Submit </button>
        </form>
    </div>
</template>

<script>
export default {
  name: 'add-product',
  data () {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: '',
      categoryId: ''
    }
  },
  methods: {
    addProduct () {
      this.$store.dispatch('addProduct', {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        categoryId: this.categoryId
      })
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    },
    message () {
      return this.$store.state.message
    }
  }
}
</script>

<style>

</style>
