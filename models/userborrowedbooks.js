const mongoose = require('mongoose')
const borrowedbooks = new mongoose.Schema({
    ISBN: String,
    Borrowed:Boolean,
    BorrowedDate: {
        type: Date,
        default: Date.now
    },
    ExpiredDate: {
        type: Date,
        default: () => new Date(Date.now() + 12096e5)
    },
    UserName: String,
    UserID: String
})

module.exports = mongoose.model('BorrowedBooks',borrowedbooks);