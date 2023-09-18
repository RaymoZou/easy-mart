require('dotenv').config();
const mongoose = require("mongoose");
const Category = require('./models/category')

console.log("This script creates some categories to populate the database. Assumes a MONGODB_URI string in .env file.");

// set this to false if you wish to retain the current data in the database
const IS_RESET = true;

// mongoose.set("strictQuery", false); // Prepare for Mongoose 7

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Debug: Should be connected?");
    if (IS_RESET) await clear_collections();
    await createCategory();
    await createShoes();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function clear_collections() {
    try {
        await Category.deleteMany({});
    } catch (error) {
        console.error(error);
    }
}

async function categoryCreate(name) {
    const category = new Category({ name: name });
    await category.save();
}

async function createCategory() {
    await Promise.all([
        categoryCreate('Snacks'),
        categoryCreate('Apparel'),
        categoryCreate('Beverages'),
        categoryCreate('Toys')
    ])
    console.log("Finish adding categories");
}

async function createShoes() {
    // console.log("creating shoes");
}