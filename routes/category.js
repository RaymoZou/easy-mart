var express = require('express');
var router = express.Router();

/* GET categories */
router.get('/', (req, res) => {
    res.render('category_index', { title: 'Categories' });
})

module.exports = router;