const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'storeDB'
});

const Schema = mongoose.Schema;

const categorySchema = Schema({
    name: {
        type: String,
        minLength: 3,
        enum: ["Snacks", "Apparel", "Beverages", "Toys"],
        unique: true
    }
})

categorySchema.virtual('url').get(function () {
    return `/category/${this._id}`
})

// collection name = 'Category' => 'categories'
const Category = mongoose.model('Category', categorySchema)
module.exports = Category;