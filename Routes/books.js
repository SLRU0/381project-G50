const express = require('express');
const user = require('../models/userinfo');
const bookdata = require('../models/bookdata');
const borrowedbookdata = require('../models/userborrowedbooks');
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploadbooks');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({storage});
const checkSession = (req, res, next) => {
    try {
        if (!req.session.userdata || !req.session) {
            return res.redirect('/login');
        }
        next();
    } catch (error) {
        console.log(error)
        next(error)
    }
}

//library books
//for normal users
router.get('/books', checkSession, async (req, res) => {
    const countboos = await borrowedbookdata.find();
    const allLibraryBooks = await bookdata.find();
    console.log(allLibraryBooks)
    if (countboos.length === 0) {
        res.render('books', {
            msg: 'No books found.',
            books: countboos,
            librarybooks: allLibraryBooks,
        });
    } else {
        res.render('books', {
            msg: null,
            books: countboos,
            librarybooks: allLibraryBooks,
        })
    }

})


//list books.ejs For searching
router.get('/borrow', checkSession, async (req, res) => {
    const count = await bookdata.find();
    if (count.length !== 0) {
        res.render('listbooks', {
            booklength: count.length,
            bookarray: count,
            searchplaceholder: '',
            IsAdmin: req.session.userdata.admin,
            msg: '',
        })
    } else {
        res.render('listbooks', {
            booklength: 0,
            bookarray: null,
            searchplaceholder: null,
            IsAdmin: req.session.userdata.admin,
            msg: null,
        })
    }
})

//restful api - get list one book
router.get('/borrow/:ISBN', checkSession, async (req, res) => {
    try {
        const allbookdata = await bookdata.find({ISBN: req.params.ISBN});
        res.render('listbooks', {
            booklength: allbookdata.length,
            bookarray: allbookdata,
            searchplaceholder: req.params.ISBN,
            IsAdmin: req.session.userdata.admin,
            msg: null,
        })
    } catch (e) {
        console.log(e);
        res.status(403).json({msg: e});
    }

})

//for user borrow books
router.post('/borrow', checkSession, async (req, res) => {
    const allbookdata = await bookdata.find();
    const bbdata = await borrowedbookdata.findOne({ISBN: req.body.isbn})
    if (await borrowedbookdata.findOne({ISBN: req.body.isbn})) {
        console.log('user already borrowed')
        if (bbdata.Borrowed === true
            &&
            req.session.userdata._id === bbdata.UserID
            &&
            req.body.isbn === bbdata.ISBN) {
            console.log('in')
            res.render('listbooks', {
                booklength: allbookdata.length,
                bookarray: allbookdata,
                searchplaceholder: req.query.search,
                IsAdmin: req.session.userdata.admin,
                msg: 'You already borrowed this book ' + req.body.isbn,
            })
        }
    } else {
        const UserBorrowedBooks = await new borrowedbookdata({
            ISBN: req.body.isbn,
            Borrowed: true,
            UserName: req.session.userdata.first_name + ' ' + req.session.userdata.last_name,
            UserID: req.session.userdata._id,
        });
        await UserBorrowedBooks.save();
        res.render('listbooks', {
            booklength: allbookdata.length,
            bookarray: allbookdata,
            searchplaceholder: req.query.search,
            IsAdmin: req.session.userdata.admin,
            msg: 'You have borrowed this book ' + req.body.isbn,
        })
    }
})


//AddLibrary
//it only allow admin to add book
router.get('/add', checkSession, async (req, res) => {
    res.render('addbooks', {})
})

router.post('/add', checkSession, upload.single('image'), async (req, res) => {
    try {
        const books = await new bookdata({
            Author: req.body.author,
            Title: req.body.title,
            ISBN: req.body.ISBN,
            Publisher: req.body.publisher,
            name: req.file.originalname,
            path: req.file.path,
            contentType: req.file.mimetype,
        });
        await books.save().then(() => {
            res.redirect('/home');
        })
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;