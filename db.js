const Sequelize = require('sequelize')

const db = new Sequelize('shopdb', 'shopper', 'shoppass', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    min: 0,
    max: 5,
  }
})

const User = db.define('users', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  }
})

const Product = db.define('products', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  manufacturer: Sequelize.STRING,
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  }
})

const Cart = db.define('carts', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  qty: Sequelize.DataTypes.NUMBER
});

Cart.belongsTo(User);
Cart.belongsTo(Product);
User.hasMany(Cart);
Product.hasMany(Cart);

db.sync()
  .then(() => console.log("Database has been synced"))
  .catch((err) => console.error("Error creating database"))

exports = module.exports = {
  User, Product, Cart
}
