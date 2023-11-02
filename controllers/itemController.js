const Item = require("../models/item");
const Category = require("../models/category");

exports.item_detail = async (req, res, next) => {
    const item = await Item.findById(req.params.id);
    res.render('item_detail.pug', {
        title: item.name,
        item,
    })
};

exports.item_form = async (req, res, next) => {
    const item = await Item.findById(req.params.id);
    res.render('item_form', {
        title: `Edit item: ${item.name}`,
        item,
    })
};

exports.item_create = async (req, res, next) => {
    const categories = await Category.find({});
    res.render('item_create', {
        title: 'Add item',
        categories: categories
    })
};

exports.item_update_post = async (req, res, next) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        _id: req.params.id,
    })

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
    res.redirect(updatedItem.url);
};

exports.item_create_post = async (req, res, next) => {
    const category = await Category.findOne({ name: req.body.category });
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category
    });

    await item.save();
    res.redirect(item.url)
};

exports.item_delete = async (req, res, next) => {
    await Item.findByIdAndRemove(req.params.id);
    res.redirect('/category');
};