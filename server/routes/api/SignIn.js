const express = require('express')
const router = express.Router()
const passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const User = require('../../models/User')
const session = require('express-session')







  router.post('/', passport.authenticate('user', { failureRedirect: '/' }),
  (req, res)=> {
    // console.log(req.body)
    res.redirect('/Home');
  });


  passport.use('user',
    new LocalStrategy(
      async (username,password,done) => {
        // console.log(username)
        try {
          let user = await User.findOne({ username: username })
        // console.log(user)
          if (!user) {
            return done(null, false)
          }

          if(password !== user.password)
            return done(null, false);
           else return done(null, user);
            

        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    // console.log(user)
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    // console.log(id)
    User.findById(id, (err, user) => done(err, user))
  })


module.exports = router








