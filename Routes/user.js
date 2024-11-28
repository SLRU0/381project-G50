const express = require('express');
const user = require('../models/userinfo');
const bcrypt = require('bcrypt');
const router = express.Router();
const checkSession = (req, res, next) => {
    try {
        if (!req.session.userdata || !req.session) {
            return res.redirect('/');
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

//read
router.get('/user/:email',checkSession, async (req, res) => {
    try{
        const selectusers = await user.find({email:req.params.email});
        res.status(200).json({msg:selectusers}).end();
    }catch (e) {
        console.log(e)
        res.status(500).json({msg:'Internal Server Error' });
    }
})

//not restful read
router.get('/user',checkSession, async (req, res) => {
    try{
        if (req.query.search===undefined || req.query.search==='' ){
            const allusers = await user.find();
            res.render('listuser', {data: allusers});
        }else{
            console.log(req.query.search)
            switch (req.query.search){
                case 'true':{
                    const selectusers = await user.find({admin:true});
                    res.render('listuser', {data: selectusers});
                    break;
                }
                case 'false':{
                    const selectusers = await user.find({admin:false});
                    res.render('listuser', {data: selectusers});
                    break;
                }
                case 'Male':{
                    const selectusers = await user.find({gander:'Male'});
                    res.render('listuser', {data: selectusers});
                    break;
                }
                case 'Female':{
                    const selectusers = await user.find({gander:'Female'});
                    res.render('listuser', {data: selectusers});
                    break;
                }
                case 'all':{
                    const allusers = await user.find();
                    res.render('listuser', {data: allusers});
                    break;
                }
                default:{
                    if (req.query.search.includes('@')){
                        const selectusers = await user.find({email:req.query.search});
                        res.render('listuser', {data: selectusers});
                        break;
                    }else{
                        const allusers = await user.find();
                        res.render('listuser', {data: allusers});
                        break
                    }
                }
            }
        }

    }catch (e) {
        console.log(e)
        res.status(500).json({msg:'Internal Server Error' });
    }

})

//create
router.post('/user',checkSession, async (req, res) => {
    try{
        const existingUser = await user.findOne({ email: req.body.email });
        if (existingUser){
            res.status(200).json({msg:'Already created this account!'})
        }else{
            const hashpassword = await bcrypt.hash(req.body.password,10);
            const data = await new user({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hashpassword,
                gander : req.body.gander,
                admin : req.body.admin,
            })
            await data.save()
            res.json({msg:'created successful'})
        }
    }catch (e){
        console.error(e);
        res.status(500).send({ msg: 'Internal Server Error' });
    }
})

//update
router.put('/user/:email',checkSession, async (req, res) => {
    try {
        const allusers = await user.findOneAndUpdate({email:req.params.email},
            req.body,
            {new: true});
        res.json(allusers);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//delete
router.delete('/user/:email',checkSession, async (req, res) => {
    try {
        await user.findOneAndDelete({email:req.params.email});
        res.status(200).json({msg:'deleted successful'})
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;