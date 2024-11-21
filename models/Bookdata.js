const mongoose = require('mongoose')
const bookdata = new mongoose.Schema({
    Author: String,
    Title: String,
    ISBN: String,
    Publisher: String,
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Bookdata',bookdata);