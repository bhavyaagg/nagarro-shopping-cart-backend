const route = require('express').Router()

route.use('/users', require('./users'))
route.use('/cart', require('./cart'))
route.use('/products', require('./products'))

exports = module.exports = {
    route
}
