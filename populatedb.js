require('dotenv').config();
const mongoose = require("mongoose");
const Category = require('./models/category');
const Item = require('./models/item');

console.log("This script creates some categories to populate the database. Assumes a MONGODB_URI string in .env file.");

// set this to false if you wish to retain the current data in the database
const IS_RESET = true;

// set mongoose connection properties
mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'storeDB'
});

main().catch((err) => console.log(err));

const categories = [];

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Debug: Should be connected?");
    if (IS_RESET) await clear_collections();
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function clear_collections() {
    try {
        await Category.deleteMany({});
        await Item.deleteMany({});
    } catch (error) {
        console.error(error);
    }
}

async function createItems() {
    await Promise.all([
        itemCreate('Hat', 3.99, 'No cap', categories[1]),
        itemCreate('Boca Bola', 1.99, 'Refreshing and good for you!', categories[2]),
        itemCreate('T-shirt', 8.99, 'An essential of all wardrobes...', categories[1]),
        itemCreate('Tennis shoes', 23.01, 'These are for tennis - obviously', categories[1]),
        itemCreate(`Rubik's Cube`, 10.99, 'People usually just peel the stickers off...', categories[3]),
        itemCreate('Granola Bar', 3.99, 'Now with 10g of protein!', categories[0]),
    ]);
    console.log("Finish adding items");
}

async function itemCreate(name, price, description, category) {
    const item = new Item({ name, price, description, category });
    await item.save();
}

async function categoryCreate(index, name) {
    const category = new Category({ name });
    categories[index] = category;
    await category.save();
}

async function createCategories() {
    await Promise.all([
        categoryCreate(0, 'Snacks'),
        categoryCreate(1, 'Apparel'),
        categoryCreate(2, 'Beverages'),
        categoryCreate(3, 'Toys')
    ]);
    console.log("Finish adding categories");
}