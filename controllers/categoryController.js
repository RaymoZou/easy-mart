const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

exports.index = asyncHandler(async (req, res, next) => {
    const categories = await Category.find({}, "name")
        .sort({ name: 1 })
        .exec();

    res.render('category_index', {
        title: 'Categories',
        category_list: categories
    })
})

exports.category_list = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    res.send(category.name);
})