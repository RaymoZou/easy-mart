var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");
const userController = require("../controllers/userController");

// GET routes

router.get('/', (req, res, next) => {
  res.render('index', { title: "EasyMart" });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About' })
});

module.exports = router;
