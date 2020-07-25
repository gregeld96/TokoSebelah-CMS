const route  = require('express').Router()
const controller = require('../controllers/product')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.use(authentication)
route.get('/', controller.read)
route.use(authorization)
route.put('/:id', controller.edit)
route.post('/add', controller.add)
route.delete('/:id', controller.delete)

module.exports = route