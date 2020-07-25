import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/MainPage.vue'
import Product from '../views/ProductPage.vue'
import Login from '../views/LoginPage.vue'
import AddProduct from '../views/AddProductPage.vue'
import ProductTable from '../components/ProductTable.vue'
import EditProduct from '../views/EditProduct.vue'
import Category from '../views/CategoryPage.vue'
import CategoryTable from '../components/CategoryTable.vue'
import AddCategory from '../views/AddCategory.vue'
import DetailCategory from '../views/DetailCategoryPage.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: 'products',
    component: Home,
    children: [
      {
        path: 'products',
        component: Product,
        children: [
          {
            path: '',
            name: 'ProductTable',
            component: ProductTable
          },
          {
            path: 'add',
            name: 'Add-Product',
            component: AddProduct
          },
          {
            path: 'edit/:id',
            name: 'edit-Product',
            component: EditProduct
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.access_token) next({ name: 'ProductTable' })
      else next()
    }
  },
  {
    path: '/',
    redirect: 'products',
    component: Home,
    children: [
      {
        path: 'categories',
        component: Category,
        children: [
          {
            path: '',
            name: 'CategoryTable',
            component: CategoryTable
          },
          {
            path: 'add',
            name: 'Add-Category',
            component: AddCategory
          },
          {
            path: ':name',
            name: 'detail-category',
            component: DetailCategory
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.access_token) next({ name: 'Login' })
  else next()
})

export default router
