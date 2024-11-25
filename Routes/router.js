const express = require('express');
const user = require('../models/userinfo');
const bcrypt = require('bcrypt');
const router = express.Router();

const checkSession = (req, res, next) => {
    try{
        if (!req.session.userdata || !req.session){
            return res.redirect('/')
        }
        next();
    }catch (error){
        console.log(error)
    }
}

//Sign up
router.get('/signup', (req, res)=> {
    //Show the  register html
    res.render('signup',{
        error:'',
        emailerror:'',
    });
});

router.post('/signup', async (req, res)=>{
    const allusers = await user.find();
    for (let i = 0; i < allusers.length; i++) {
        if (req.body.email === allusers[i].email){
            res.render('signup',{
                error:'',
                emailerror:'Email already exists',
            });
            return;
        }
    }
    //double-check the password is same as confirm password
    if (req.body.password !== req.body.confirm_password) {
        res.render('signup',{
            error:'Passwords do not match',
            emailerror:'Email already exists',
        });
    }else{
        try{
            //if success, make a document
            const hashpassword = await bcrypt.hash(req.body.password,10);
            const data = await new user({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hashpassword,
                gander : req.body.Gander,
                admin : false,
            })
            //upload to the database
            await data.save().then(()=>{
                //move forward to login page to login
                res.redirect('/');
            })
        }catch (e) {
            console.log(e);
            res.status(500).json({msg:'Server crash'});
        }
    }
});

//Login
router.get('/',(req, res)=> {
   res.status(200).render('login',{msg:''});
});

router.post('/', async (req, res) => {
    try{
        //find the data by the input email.
        if (await user.findOne({email:req.body.email})){
            const tempUserData = await user.findOne({email:req.body.email});
            if (await bcrypt.compare(req.body.password,tempUserData.password)){
                console.log('login success!');
                //record the login user by session
                req.session.userdata = tempUserData;
                console.log(req.session.userdata);
                //check admin is true
                if (tempUserData.admin===true){
                    req.session.adminstring = 'admin';
                }
                res.redirect('/home');
            }else{
                res.render('login',{
                    msg:'Email or password incorrect',
                });
            }
        }else{
            res.render('login',{
                msg:'Email doesn\'t exist',
            });
        }
    }catch (e){
        console.log(e);
    }
});

//home page
//if user is admin, he/she will have more api to check all user data.
router.get('/home',checkSession,async (req, res)=> {
    //to check the login success
    res.render('home',{
        name:req.session.userdata.first_name+''+req.session.userdata.last_name,
        //to show in home page
        adminstring: req.session.adminstring,
        admin:req.session.userdata.admin,
    });
})

//logout
router.get('/logout',async (req,res)=>{
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;