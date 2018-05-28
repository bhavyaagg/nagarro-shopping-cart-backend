const User = require('../../db').User
const route = require('express').Router()

route.get('/', (req, res) => {
  // We want to send an array of all users
  // From our database here

  User.findAll()
    .then((users) => {
      res.status(200).send(users)
    })
    .catch((err) => {
      res.status(500).send({
        error: "Could not retrive users"
      })
    })

})


route.post('/register', (req, res) => {
  // We expect the req to have name in it
  // We will create a new user
  if (!req.body.name || !req.body.password) {
    return res.send({
      success: false,
      msg: "Please Enter All The Details"
    })
  }
  User.create({
    name: req.body.name,
    password: req.body.password
  }).then((user) => {
    res.status(201).send(user)
  }).catch((err) => {
    console.log(err)
    if(err.name === 'SequelizeUniqueConstraintError'){
      return res.status(501).send({
        success: false,
        msg: "User with this name already exists"
      })
    }
    res.status(501).send({
      success: false,
      msg: "Could not add new user"
    })
  })
})


route.post('/login', (req, res) => {
  if (!req.body.name || !req.body.password) {
    return res.send({
      success: false,
      msg: "Please Enter All The Details"
    })
  }
  User.find({
    where: {
      name: req.body.name,
      password: req.body.password
    }
  }).then((user) => {
    if (!user) {
      return res.send({
        success: false,
        msg: "No user found with these credentials"
      })
    }
    res.status(200).send({
      success: true,
      data: user
    })
  }).catch((err) => {
    res.status(501).send({
      success: false,
      msg: "Server Error"
    })
  })
})

exports = module.exports = route
