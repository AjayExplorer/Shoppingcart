const express = require('express');
const router = express.Router();
const Product = require('..product');

router.get('/', async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') return res.redirect('/');
  const products = await Product.find();
  res.render('admin', { user: req.session.user, products });
});

router.post('/add-product', async (req, res) => {
  const { name, price, stock } = req.body;
  await Product.create({ name, price, stock });
  res.redirect('/admin');
});

module.exports = router;