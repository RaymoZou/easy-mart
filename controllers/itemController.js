const asyncHandler = require("express-async-handler");
const Item = require("../models/item");
const Category = require("../models/category");

exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id);
    res.render('item_detail.pug', {
        title: item.name,
        item,
    })
})

exports.item_form = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id);
    res.render('item_form', {
        title: `Edit item: ${item.name}`,
        item,
    })
})

exports.item_update_post = asyncHandler(async (req, res, next) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        _id: req.params.id,
    })

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
    res.redirect(updatedItem.url);
})

exports.item_delete = asyncHandler(async (req, res, next) => {
    await Item.findByIdAndRemove(req.params.id);
    res.redirect('/category');
})

exports.item_create = asyncHandler(async (req, res, next) => {
    res.send('creating item');
})