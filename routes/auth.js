const express = require('express');
const router = express.Router();
const User = require('../model/User');
const {registerValidation , loginValidation} = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/',async (req, res) => {
    try{
        const user = await User.find();
        res.json(user)
    }catch(err){
        console.error(err)
    }
})

router.post('/register',async (req, res) => {

    //LET VALIDATE DATA BEFORE SAVING
    const {error} = registerValidation(req.body);
    if(error){ 
       return res.status(400).send(error.details[0].message);
    }

    //  CHECK USER EXISTS
    const emailExists = await User.findOne({ email : req.body.email});
    if(emailExists) return res.status(400).send('Email already exists');

    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);


    // ADD USER
    const user =  new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
    });
    try{
        const savedUser = await user.save();    
        res.send({user : user._id});
    }
    catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
       //  CHECK USER EXISTS
       const user = await User.findOne({ email : req.body.email});
       if(!user) return res.status(400).send('Email not found');
       
       //CHECK PASSWORD CORRECT
       const validPass = await bcrypt.compare(req.body.password, user.password);
       if(!validPass) return res.status(400).send('Password incorrect');

       //CREATE AND SIGN TOKEN
       const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
       res.header('auth-token', token).send(token);

       res.send('logged in')
});


module.exports = router;