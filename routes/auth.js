const express = require('express');
const router = express.Router();
const User = require('..User');

router.get('/', (req, res) => res.render('login'));

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.send('Invalid login');
  req.session.user = user;
  if (user.role === 'admin') return res.redirect('/admin');
  res.redirect('/shop');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;