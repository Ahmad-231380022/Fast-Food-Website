require('dotenv').config();
const mongoose = require('mongoose');
const { connectToDatabase } = require('../lib/connectToDatabase');
const User = require('../models/User');
const Product = require('../models/Product');
const Settings = require('../models/Settings');
const { ROLES } = require('../config/constants');

async function run() {
  await connectToDatabase();

  await Promise.all([User.deleteMany({}), Product.deleteMany({})]);

  const admin = await User.create({ name: 'Admin', email: 'admin@ffh.com', password: 'admin123', role: ROLES.ADMIN });
  const manager = await User.create({ name: 'Manager', email: 'manager@ffh.com', password: 'manager123', role: ROLES.MANAGER });
  const cashier = await User.create({ name: 'Cashier', email: 'cashier@ffh.com', password: 'cashier123', role: ROLES.CASHIER });
  const customer = await User.create({ name: 'Jane Customer', email: 'jane@ffh.com', password: 'password', role: ROLES.CUSTOMER });

  const products = await Product.insertMany([
    { name: 'Classic Burger', category: 'Burgers', price: 5.99, stock: 100, description: 'Juicy beef patty, lettuce, tomato, sauce', image: '' },
    { name: 'Cheese Burger', category: 'Burgers', price: 6.99, stock: 80, description: 'Cheddar cheese and beef patty', image: '' },
    { name: 'Chicken Nuggets (6pc)', category: 'Sides', price: 3.49, stock: 200, description: 'Crispy chicken bites', image: '' },
    { name: 'Fries', category: 'Sides', price: 2.49, stock: 300, description: 'Golden fries', image: '' },
    { name: 'Cola', category: 'Drinks', price: 1.99, stock: 500, description: 'Chilled soda', image: '' },
  ]);

  await Settings.create({});

  // eslint-disable-next-line no-console
  console.log('Seed completed', { users: [admin.email, manager.email, cashier.email, customer.email], products: products.length });
  await mongoose.connection.close();
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});

