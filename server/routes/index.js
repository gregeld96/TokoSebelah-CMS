const route = require('express').Router()
const userRoute = require('./user');
const categoryRoute = require('./category');
const productRoute = require('./product');

route.use('/', userRoute);
route.use('/categories', categoryRoute);
route.use('/products', productRoute)

module.exports = route