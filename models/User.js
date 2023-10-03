//Import mongoose
const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt');

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

/* Fire a hook after new user has been saved to the database
userSchema.post('save', function (doc, next) {
    console.log('New user created and saved', doc)
    next()
})*/

// Fire a hook before new user has been saved to the database
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email })
    if (user){
       const auth = await bcrypt.compare(password, user.password)
       if (auth) {
        return user;
       }
       throw Error('Invalid password')
    }
    throw Error('User not found')
}



//Creating model
const User = mongoose.model('user', userSchema);

//Exporting a model
module.exports = User;