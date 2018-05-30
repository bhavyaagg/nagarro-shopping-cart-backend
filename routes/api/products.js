const Product = require('../../db').Product
const Cart = require('../../db').Cart
const User = require('../../db').User
const route = require('express').Router();

route.get('/', (req, res) => {
  // Get all products
  Product.findAll({
    include: [
      {
        model: Cart,
        include: [{
          model: User,
          where: {
            name: req.query.name,
            password: req.query.password
          }
        }]
      }
    ]
  }).then((products) => {
    products = products.map((product) => {
      product = product.get()
      if (product.carts) {
        product.carts = product.carts.map((cart) => {
          cart = cart.get();
          cart.user = cart.user.get();
          return cart;
        })
      }
      return product;
    })
    products.sort((a, b) => a.id - b.id);
    res.status(200).send(products)
  }).catch((err) => {
    console.log(err)
    res.status(500).send({
      error: "Could not retrieve products"
    })
  })
})

route.post('/', (req, res) => {
  // Validate the values
  if (isNaN(req.body.price)) {
    return res.status(403).send({
      error: "Price is not valid number"
    })
  }
  // Add a new product
  Product.create({
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    price: parseFloat(req.body.price)
  }).then((product) => {
    res.status(201).send({
      success: true,
      data: product
    })
  }).catch((error) => {
    res.status(501).send({
      success: false,
      msg: "Error adding product"
    })
  })
})

exports = module.exports = route
