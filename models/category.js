const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3
    }
})

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category;