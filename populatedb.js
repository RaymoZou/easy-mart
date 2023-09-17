require('dotenv').config();
const mongoose = require("mongoose");
const Category = require('./models/category')

console.log("This script creates some categories to populate the database. Assumes a MONGODB_URI string in .env file.");

// mongoose.set("strictQuery", false); // Prepare for Mongoose 7

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Debug: Should be connected?");
    await createCategory();
    await createShoes();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function categoryCreate(name) {
    const category = new Category({ name: name });
    await category.save();
}

async function createCategory() {
    await Promise.all([
        categoryCreate('Pants'),
        categoryCreate('Hats'),
        categoryCreate('Shirts'),
        categoryCreate('Shoes')
    ])
    console.log("Finish adding categories");
}

async function createShoes() {
    // console.log("creating shoes");
}