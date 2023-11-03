const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'storeDB'
});

const Schema = mongoose.Schema;

const itemSchema = Schema({
    name: { type: String, minLength: 3, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: Schema.ObjectId, ref: "Category", required: true }
})

itemSchema.virtual('url').get(function () {
    return `/category/item/${this._id}`
})

// collection name = 'Item' => 'items'
const Item = mongoose.model('Item', itemSchema)
module.exports = Item;