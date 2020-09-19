const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/',(req,res)=>{
    const {name, email, password} = req.body;
    
    //Check Simple Validation
    if(!name || !email || !password)
        {
            return res.send('Please Enter all the Fields');
        }

    //Check For Existing User
    User.findOne({ email })
    .then(user=>{
        if(user) return res.status(400).json({msg: "User Already Exist"});

        const newUser = new User({
            name,
            email,
            password
        });
        
        //Create Salt and Hash
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt, (err, hash)=>{
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user=>{
                    jwt.sign(
                        { id : user.id },
                        'ma_myjwtSecret',
                        { expiresIn: 3600 },
                        (err,token)=>{
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )   
                }); 
            });
        });
    });
});





module.exports = router;