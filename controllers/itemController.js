const asyncHandler = require("express-async-handler");
const Item = require("../models/item");

exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id);
    res.render('item_detail.pug', {
        title: item.name,
        item,
    })
})