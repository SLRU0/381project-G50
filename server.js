const express = require('express');
const app = express();
const port = process.env.PORT || 8099;

//app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
/**
 * This is the home page
 */
app.get('/', (req, res)=> {
    /**
     * this is variable is rendered to the website.
     * @type {{password: string, title: string, account: string}}
     */
    let data = {
        title:'Home',
        account:'Account',
        password:'Password',
    }
    res.render('index',{data:data});
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})