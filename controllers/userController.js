const passport = require('../utils/passport');

// exports.verify_user = async (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if (err) { return next(err); }
//         if (!user) { return res.redirect('/login'); }
//         req.login(user, next);
//     })(req, res, next);
// };

exports.verify_user = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
})

exports.logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) next(err);
        res.redirect('/login');
    });
};