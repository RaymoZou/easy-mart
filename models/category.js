const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = Schema({
    name: {
        type: String,
        minLength: 3,
        enum: ["Snacks", "Apparel", "Beverages", "Toys"],
        unique: true
    }
})

categorySchema.virtual('url').get(function() {
    return `/category/${this._id}`
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category;