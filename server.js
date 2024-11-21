const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const app = express();
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 8099;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'userData',
    cookie:{maxAge:(60*60*1000)},
    httpOnly:true,
    resave: false,
    saveUninitialized: true,
}))


//this router to handle each api
app.use(require('./Routes/router'));
app.use(require('./Routes/profile'));
app.use('/api',require('./Routes/books'));
app.use('/api',require('./Routes/user'));
app.use(express.static('public'));

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('MongoDB Connected!');
        app.listen(port, () => {
            // this for the local testing.
            console.log(`Listening on port http://localhost:${port}/login`);
        });
    })
    .catch((err)=>{console.log(err)})
