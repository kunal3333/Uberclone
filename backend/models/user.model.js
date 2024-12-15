const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Make sure dotenv is loaded
require('dotenv').config();

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [ 3, 'First name must be at least 3 characters long' ],
        },
        lastname: {
            type: String,
            minlength: [ 3, 'Last name must be at least 3 characters long' ],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [ 5, 'Email must be at least 5 characters long' ],
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],  // Regex validation
    },
    password: {
        type: String,
        required: true,
        select: false,  // Don't include password by default in queries
    },
    socketId: {
        type: String,
    },
});

// Hash password before saving if it's modified
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {  // Only hash if password is modified
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// JWT generation method
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return token;
    } catch (error) {
        throw new Error('Error generating token');
    }
};

// Compare password method
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error('Error comparing password');
    }
};

// Static method for password hashing
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
