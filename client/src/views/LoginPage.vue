<template>
  <div id="login-form">
        <div id="login-container">
            <h1 class="title-header text-center">Login Page</h1>
            <div class="alert alert-warning" role="alert" v-if="message">{{ message }}</div>
            <form  class="my-4" @submit.prevent="login">
                <div class="form-group">
                    <input type="email" class="form-control w-75 pl-3 mx-auto border-0" v-model="email" placeholder="example@email.com" />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control pl-3 w-75 mx-auto border-0" v-model="password" placeholder="password" />
                </div>
                <div class="d-flex justify-content-center">
                    <button id="btn-login" type="submit" class="btn btn-primary w-75 rounded-lg">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'login-page',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('loginUser', {
        email: this.email,
        password: this.password
      })
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
#login-form {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

#login-container {
    background-color: rgba(5, 6, 100, 0.76);
    padding: 40px;
    border-radius: 10px;
    color: white;
    width: 500px;
}
</style>
