import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    selectProduct: {},
    selectCategory: {},
    message: ''
  },
  getters: {
  },
  mutations: {
    listProduct (state, payload) {
      state.products = payload
    },
    listCategory (state, payload) {
      state.categories = payload
    },
    newProduct (state, payload) {
      console.log(payload)
      state.products.push(payload.data)
    },
    deletedProduct (state, productId) {
      const index = state.products.findIndex(product => product.id === Number(productId))
      // console.log(index)
      state.products.splice(index, 1)
    },
    filterProduct (state, payload) {
      state.selectProduct = payload
    },
    updateProduct (state, payload) {
      const index = state.products.findIndex(product => product.id === Number(payload.id))
      state.products.splice(index, 1, payload)
    },
    deletedCategory (state, categoryId) {
      const index = state.categories.findIndex(category => category.id === Number(categoryId))
      // console.log(index)
      state.categories.splice(index, 1)
    },
    newCategory (state, payload) {
      // console.log(payload)
      state.categories.push(payload.data)
    },
    specificCategory (state, payload) {
      // console.log(payload)
      state.selectCategory = payload
    },
    errorMessage (state, message) {
      state.message = message
    },
    clearMessage (state) {
      state.message = ''
    }
  },
  actions: {
    loginUser (context, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          context.commit('clearMessage')
          router.push('/')
        })
        .catch(err => {
          console.log(err.response.data)
          context.commit('errorMessage', err.response.data)
        })
    },
    fetchProduct ({ commit }) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('listProduct', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCategory ({ commit }) {
      axios({
        method: 'GET',
        url: '/categories',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('listCategory', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct (context, payload) {
      axios({
        method: 'POST',
        url: '/products/add',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({ data }) => {
          context.commit('newProduct', data)
          context.commit('clearMessage')
          router.push('/products')
        })
        .catch(err => {
          console.log(err.response.data)
          context.commit('errorMessage', err.response.data)
        })
    },
    deleteProduct (context, productId) {
      axios({
        method: 'DELETE',
        url: `/products/${productId}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          context.commit('deletedProduct', productId)
          router.push('/products')
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectedProduct ({ commit }, payload) {
      // console.log(payload)
      commit('filterProduct', payload)
      router.push(`/products/edit/${payload.id}`)
    },
    editProduct ({ commit }, payload) {
      // console.log(payload)
      axios({
        method: 'PUT',
        url: `/products/${payload.id}`,
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
          categoryId: payload.categoryId
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          // console.log(data.product)
          commit('updateProduct', data.product)
          commit('clearMessage')
          router.push('/products')
        })
        .catch(err => {
          console.log(err.response.data)
          commit('errorMessage', err.response.data)
        })
    },
    deleteCategory (context, categoryId) {
      axios({
        method: 'DELETE',
        url: `/categories/${categoryId}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          context.commit('deletedCategory', categoryId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCategory (context, payload) {
      axios({
        method: 'POST',
        url: '/categories/add',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({ data }) => {
          context.commit('newCategory', data)
          context.commit('clearMessage')
          router.push('/categories')
        })
        .catch(err => {
          console.log(err.response.data)
          context.commit('errorMessage', err.response.data)
        })
    },
    selectedCategory (context, payload) {
      // console.log(payload)
      axios({
        method: 'GET',
        url: `/categories/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          // console.log(data.data)
          context.commit('specificCategory', data.data)
          router.push(`/categories/${payload}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    userLogout (context) {
      localStorage.clear()
      router.push('/login')
    }
  }
})
