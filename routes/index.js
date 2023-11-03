var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");
const userController = require("../controllers/userController");

// GET routes

router.get('/', function (req, res, next) {
  res.render('index', { title: "EasyMart" });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About' })
});

router.get('/signup', function (req, res) {
  res.render('signup', { title: "Sign Up" });
});

router.get('/login', function (req, res) {
  res.render('login', { title: "Login" });
});

// POST routes
router.post('/login', userController.verify_user);

// salt plain-text password with 10 salt rounds and store hash in database
router.post('/signup', async function (req, res, next) {
  try {
    const username = req.body.username;
    const hash = await bcrypt.hash(req.body.password, 10);
    console.log(username);
    console.log(hash);
    const user = new User({ username, hash });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
