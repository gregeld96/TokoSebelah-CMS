const route = require('express').Router();
const controller = require('../controllers/category');
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.use(authentication)
route.get('/', controller.read);
route.get('/:name', controller.filter);
route.use(authorization)
route.post('/add', controller.add);
route.delete('/:id', controller.delete)

module.exports = route;