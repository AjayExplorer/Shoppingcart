const express = require('express');
const router = express.Router();

// Sample product list
const products = [
  { id: 1, name: 'T-Shirt', price: 499 },
  { id: 2, name: 'Jeans', price: 999 },
  { id: 3, name: 'Sneakers', price: 1999 }
];

// In-memory cart
let cart = [];

router.get('/', (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  res.render('index', { title: 'Shopping Cart', products, cart, total });
});

router.post('/add-to-cart', (req, res) => {
  const productId = parseInt(req.body.productId);
  const product = products.find(p => p.id === productId);
  if (product) cart.push(product);
  res.redirect('/');
});

router.post('/remove-from-cart', (req, res) => {
  const productId = parseInt(req.body.productId);
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1); // remove the first matching item
  }
  res.redirect('/');
});

module.exports = router;
