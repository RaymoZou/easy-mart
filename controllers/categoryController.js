const Category = require("../models/category");
const Item = require("../models/item");

exports.index = async (req, res, next) => {
    const categories = await Category.find({}, "name")
        .sort({ name: 1 })
        .exec();

    res.render('category_list', {
        title: 'Categories',
        category_list: categories
    })
};

exports.category_list = async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    const items = await Item.find({ category: req.params.id })
    res.render('category_detail', {
        title: category.name,
        items,
    })
};