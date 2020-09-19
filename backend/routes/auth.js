const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./../middleware/auth');


router.post('/',(req,res)=>{
    const {email, password} = req.body;
    
    //Check Simple Validation
    if(!email || !password)
        {
            //return res.send('Please Enter all the Fields');
            res.status(400).json({msg: "Please Enter all the feilds"});
        }

    //Check For Existing User
    User.findOne({ email })
    .then(user=>{
        if(!user) return res.status(400).json({msg: "User Doesn't Exist"});

        //Validate Password
        bcrypt.compare(password, user.password)
        .then(isMatch=>{
            if(!isMatch) return res.status(400).json({"msg": "Invalid Credentials"})

            jwt.sign(
                { id : user.id },
                'ma_myjwtSecret',
                { expiresIn: 3600 },
                (err,token)=>{
                    if(err) {
                        return res.status(400).json({
                            msg: "Invalid credentials"
                        })
                    };
                    return res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            )   
        })
    });
});


router.get('/user', auth, (req,res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user=> res.json(user));
})





module.exports = router;