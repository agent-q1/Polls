const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../../models/User')





router.post('/',(req,res,next)=>{
    User.findOne({username:req.body.username})
        .exec()
        .then((user) => {
            console.log(user)
            if(user){
                console.log('Already Exist Will Put In React after Better Forms')
                res.redirect('/');  
            } 
            else{
                var newuser = new User;
                newuser.username = req.body.username;
                newuser.password = req.body.password;
                newuser.save()
                    .then(() =>{res.redirect('/');console.log('Added')} )
                    .catch((err) => next(err))
            }
        })

        .catch((err) => next(err));
})



module.exports = router








