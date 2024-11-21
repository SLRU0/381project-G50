const express = require('express');
const user = require('../models/userinfo');
const bcrypt = require("bcrypt");
const router = express.Router();
const checkSession = (req, res, next) => {
    try{
        if (!req.session.userdata || !req.session){
            return res.redirect('/login');
        }
        next();
    }catch (error){
        console.log(error)
        next(error)
    }
}

//profile
router.get('/profile',checkSession,async (req, res)=> {
    try{
        res.render('profile', {
            firstName:req.session.userdata.first_name,
            lastName:req.session.userdata.last_name,
            email:req.session.userdata.email,
        });
    }catch (error){
        res.redirect('/login');
    }
})

//delete Account
router.get('/profile/deleteAccount',checkSession,async (req, res)=> {
   res.render('deleteAccount');
})

router.post('/profile/deleteAccount',checkSession,async (req, res)=> {
    await user.findOneAndDelete({
        _id:req.session.userdata._id
    }).then(()=>{
        req.session.destroy();
        res.redirect('/login');
    })
})

//render the web
router.get('/profile/changeName',checkSession, (req, res)=> {
    res.render('changeName', {})
});

//this function for updating
//Update firstName and Last Name
router.post('/profile/changeName',checkSession,async (req, res)=> {
    await user.findOneAndUpdate(
        {_id:req.session.userdata._id},
        {first_name:req.body.firstName,
         last_name:req.body.lastName,},
        {new : true}
    ).then(async ()=>{
        const result = await user.findOne({_id:req.session.userdata._id});
        req.session.userdata = result;
        console.log(req.session.userdata)
        res.redirect('/profile')
    })
})

//update Email
router.get('/profile/changeEmail',checkSession, (req, res)=> {
    res.render('changeEmail', {})
})

router.post('/profile/changeEmail',checkSession,async (req, res)=> {
    await user.findOneAndUpdate(
        {_id:req.session.userdata._id},
        {email:req.body.email},
        {new : true}
    ).then(async ()=>{
        const result = await user.findOne({_id:req.session.userdata._id});
        req.session.userdata = result;
        console.log(req.session.userdata)
        res.redirect('/profile')
    })
})

//update Password
router.get('/profile/changePassword',checkSession, (req, res)=> {
    res.render('changePassword', {})
})

router.post('/profile/changePassword',checkSession,async (req, res)=> {
    const tempUserData = await user.findOne({_id:req.session.userdata._id})
    if (await bcrypt.compare(req.body.oldpassword,tempUserData.password)){
        const hashpassword = await bcrypt.hash(req.body.newpassword,10);
        await user.findOneAndUpdate(
            {_id:req.session.userdata._id},
            {password:hashpassword},
            {new : true}
        ).then(async ()=>{
            const result = await user.findOne({_id:req.session.userdata._id});
            req.session.userdata = result;
            console.log(req.session.userdata)
            res.redirect('/profile')
        })
    }
})

module.exports = router;