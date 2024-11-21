const mongoose = require('mongoose');
const userData = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 35,
    },
    last_name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 35,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    gander : {
        type: String,
        required: true,
    },
    admin:Boolean,
})
module.exports = mongoose.model('UserInfo', userData);