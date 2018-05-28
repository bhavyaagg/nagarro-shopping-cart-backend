/**
 * Created by bhavyaagg on 28/05/18.
 */
const Product = require('../../db').Product
const Cart = require('../../db').Cart
const route = require('express').Router();
const User = require('../../db').User

route.post('incProduct', (req, res) => {
  User.find({
    where: {
      name: req.body.name,
      password: req.body.password
    }
  }).then((user) => {
    if (!user) {
      return res.send({
        success: false,
        msg: "Incorrect User Details"
      })
    }
    Cart.findOrCreate({
      where: {
        userId: user.id,
        productId: req.body.productId
      },
      defaults: {
        userId: user.id,
        productId: req.body.productId,
        qty: 1
      }
    }).then((cart) => {
      console.log(cart)
    })
  })
})

exports = module.exports = route
