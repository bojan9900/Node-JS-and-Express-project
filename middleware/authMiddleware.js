const jwt = require('jsonwebtoken');

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

module.exports = { requireAuth }