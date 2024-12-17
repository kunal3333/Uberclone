const mongoose = require('mongoose');

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
        required: true
    },
    socketId: {
        type: String,
    },
});

let userModel = mongoose.model('users', userSchema);
module.exports =userModel;
