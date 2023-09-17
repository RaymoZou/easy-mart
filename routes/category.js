var express = require('express');
var router = express.Router();

// controllers
const category_controller = require("../controllers/categoryController");

/* GET categories */
router.get('/', category_controller.index);

module.exports = router;