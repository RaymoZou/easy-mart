const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'storeDB'
});

const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        unique: true
    },
    hash: {
        type: String,
        minLength: 8,
    }
})

// collection name = 'User' => 'users'
const User = mongoose.model('User', userSchema)
module.exports = User;