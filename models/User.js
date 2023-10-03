//Import mongoose
const mongoose = require('mongoose');
const { isEmail } = require('validator')

//Creating schema for the model
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
})

//Creating model
const User = mongoose.model('user', userSchema);

//Exporting a model
module.exports = User;