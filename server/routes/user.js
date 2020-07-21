const route = require('express').Router();
const controller = require('../controllers/user');

route.post('/login', controller.login);

module.exports = route;