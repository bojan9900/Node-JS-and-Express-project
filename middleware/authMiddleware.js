const jwt = require('jsonwebtoken');
const User = require('../models/User');


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    // Check if jwt exists and validate it
    if (token) {
        jwt.verify(token, 'bojan secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                console.log(decodedToken);
                next()
            }
        })
    }
    else {
        res.redirect('/login')
    }

}

// Checking current user

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    // Check if jwt exists
    if (token) {
        jwt.verify(token, 'bojan secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next()
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser }