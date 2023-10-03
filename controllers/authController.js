const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email:'',password:''}

    //User not found
    if (err.message === 'User not found')
        errors.email = 'There is no user with given email.'

    //Invalid password
    if (err.message === 'Invalid password')
        errors.password = 'The password you entered is invalid.'

    // Error when duplicated
    if (err.code == 11000) {
        errors.email = 'Email is already registered';
        return errors;
    }

    // Validation errors
    if (err.message.includes('user validation failed')) {
        (Object.values(err.errors)).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}
// Creating JWT token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'bojan secret', {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({user: user._id});
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.login( email, password );
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({user: user._id});
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}