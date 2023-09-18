const mongoose = require('mongoose');
const Category = require('category');

const Schema = mongoose.Schema;

const categorySchema = Schema({
    name: { type: String, minLength: 3 },
    price: { type: Number },
    description: { type: String },
    category: { type: Category }
})

categorySchema.virtual('url').get(function () {
    return `/category/${this._id}`
})

const Item = mongoose.model('Category', categorySchema)
module.exports = Item;