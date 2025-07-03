// 📁 app.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const app = express();

const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const customerRouter = require('./routes/customer');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ FIXED MongoDB connection with error handling
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.use(session({
  secret: 'secretkey123',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/ecommerce' })
}));

app.use('/', authRouter);
app.use('/admin', adminRouter);
app.use('/shop', customerRouter);

app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
