const express = require('express');
const app = express();
const port = process.env.PORT || 8099;

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.send("HI")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})