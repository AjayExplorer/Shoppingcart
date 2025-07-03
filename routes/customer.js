const express = require('express');
const router = express.Router();
const Product = require('./modelProduct');

router.get('/', async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'customer') return res.redirect('/');
  const products = await Product.find();
  res.render('shop', { user: req.session.user, products });
});

module.exports = router;