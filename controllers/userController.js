const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.verify_user = async (req, res, next) => {
    console.log('verify user called');
    try {
        const username = req.body.username;
        const user = await User.findOne({ username });
        const result = await bcrypt.compare(req.body.password, user.hash);
        if (result) {
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        next(err);
    }
}