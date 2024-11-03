const express = require('express');
const app = express();
const port = process.env.PORT || 8099;

app.get('/', function (req, res) {
    res.render('HI');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})