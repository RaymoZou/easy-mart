var express = require('express');
var router = express.Router();

// controllers
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

/* GET categories */
router.get('/', category_controller.index);

router.get('/:id', category_controller.category_list);

router.get('/item/:id', item_controller.item_detail);

router.get('/item/:id/update', item_controller.item_form);

module.exports = router;